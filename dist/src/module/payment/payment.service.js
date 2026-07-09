"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const enums_1 = require("../../../generated/prisma/enums");
const config_1 = __importDefault(require("../../config"));
const prisma_1 = require("../../lib/prisma");
const stripe_1 = require("../../lib/stripe");
const payment_utils_1 = require("./payment.utils");
const createCheckoutSession = async (userId, bookingId) => {
    const transactionResult = await prisma_1.prisma.$transaction(async (tex) => {
        const booking = await tex.booking.findFirstOrThrow({
            where: {
                id: bookingId
            },
            include: {
                service: true, payment: true
            },
        });
        if (booking.customerId !== userId) {
            throw new Error("You are not allowed to pay for this booking");
        }
        if (booking.status !== enums_1.BookingStatus.ACCEPTED) {
            throw new Error(`Cannot pay for a booking with status ${booking.status}`);
        }
        if (booking.payment) {
            throw new Error("Payment already exists for this booking");
        }
        const amount = booking.service.price;
        const session = await stripe_1.stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: booking.service.title },
                        unit_amount: Math.round(amount * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            payment_method_types: ["card"],
            success_url: `${config_1.default.app_url}/booking/${booking.id}?success=true`,
            cancel_url: `${config_1.default.app_url}/payment?success=false`,
            metadata: {
                bookingId: booking.id,
                userId,
            },
        });
        await tex.payment.create({
            data: {
                bookingId: booking.id,
                transactionId: session.id,
                amount,
                method: enums_1.PaymentMethod.STRIPE,
                provider: session.id,
                status: enums_1.PaymentStatus.PENDING,
            },
        });
        return session.url;
    });
    return {
        paymentUrl: transactionResult,
    };
};
const handelWebhook = async (payload, signature) => {
    const endPointSecret = config_1.default.stripe_webhook_secret;
    console.log(endPointSecret);
    const event = stripe_1.stripe.webhooks.constructEvent(payload, signature, endPointSecret);
    switch (event.type) {
        case "checkout.session.completed":
            console.log("checkout completed");
            await (0, payment_utils_1.handelCheckoutCompleted)(event.data.object);
            break;
        default:
            console.log(`no event match, unhandled event type ${event.type}`);
            break;
    }
};
const getMyPayments = async (customerId) => {
    return prisma_1.prisma.payment.findMany({
        where: {
            booking: {
                customerId
            }
        },
        include: {
            booking: {
                include: {
                    service: true
                }
            }
        },
    });
};
const getPaymentById = async (paymentId, userId) => {
    const payment = await prisma_1.prisma.payment.findFirstOrThrow({
        where: {
            id: paymentId
        },
        include: {
            booking: {
                include: {
                    service: true,
                    technician: true
                }
            },
        },
    });
    return payment;
};
exports.paymentService = {
    createCheckoutSession,
    handelWebhook,
    getMyPayments,
    getPaymentById,
};
//# sourceMappingURL=payment.service.js.map