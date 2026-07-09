"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handelCheckoutCompleted = void 0;
const prisma_1 = require("../../lib/prisma");
const enums_1 = require("../../../generated/prisma/enums");
const handelCheckoutCompleted = async (session) => {
    const bookingId = session.metadata?.bookingId;
    if (!bookingId) {
        console.log("Missing bookingId in session metadata:", session.id);
        return;
    }
    const payment = await prisma_1.prisma.payment.findUnique({
        where: { transactionId: session.id },
    });
    if (!payment) {
        console.log("Payment record not found for session:", session.id);
        return;
    }
    if (payment.status === enums_1.PaymentStatus.COMPLETED) {
        return;
    }
    await prisma_1.prisma.$transaction(async (tex) => {
        await tex.payment.update({
            where: {
                id: payment.id
            },
            data: {
                status: enums_1.PaymentStatus.COMPLETED,
                paidAt: new Date()
            }
        });
        await tex.booking.update({
            where: {
                id: bookingId
            },
            data: {
                status: enums_1.BookingStatus.PAID
            }
        });
    });
};
exports.handelCheckoutCompleted = handelCheckoutCompleted;
//# sourceMappingURL=payment.utils.js.map