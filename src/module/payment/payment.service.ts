

import Stripe from "stripe";

import { BookingStatus, PaymentStatus, PaymentMethod } from "../../../generated/prisma/enums";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { handelCheckoutCompleted } from "./payment.utils";

const createCheckoutSession = async (userId: string, bookingId: string) => {
  const transactionResult = await prisma.$transaction(async (tex) => {
    const booking = await tex.booking.findFirstOrThrow({
      where: { id: bookingId },
      include: {
        service: true, payment: true
      },
    });

    if (booking.customerId !== userId) {
      throw new Error("You are not allowed to pay for this booking");
    }

    if (booking.status !== BookingStatus.ACCEPTED) {
      throw new Error(`Cannot pay for a booking with status ${booking.status}`);
    }

    if (booking.payment && booking.payment.status === PaymentStatus.COMPLETED) {
      throw new Error("Payment already completed for this booking");
    }

    if (booking.payment && booking.payment.status === PaymentStatus.PENDING) {
      await tex.payment.delete({
        where: {
          id: booking.payment.id
        }
      });
    }

    const amount = booking.service.price;

    const session = await stripe.checkout.sessions.create({
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

success_url: `${config.app_url}/dashboard/customer/payments/success?bookingId=${booking.id}`,
cancel_url: `${config.app_url}/dashboard/customer/payments/cancle?bookingId=${booking.id}`,
      metadata: { bookingId: booking.id, userId },
    });

    await tex.payment.create({
      data: {
        bookingId: booking.id,
        transactionId: session.id,
        amount,
        method: PaymentMethod.STRIPE,
        provider: session.id,
        status: PaymentStatus.PENDING,
      },
    });

    return session.url;
  });

  return { paymentUrl: transactionResult };
};

const handelWebhook = async (payload: Buffer, signature: string) => {

  const endPointSecret = config.stripe_webhook_secret as string
  console.log(endPointSecret)
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    endPointSecret);

  switch (event.type) {
    case "checkout.session.completed":
      console.log("checkout completed");

      await handelCheckoutCompleted(event.data.object);
      break;

    default:
      console.log(`no event match, unhandled event type ${event.type}`);
      break;
  }
};

const getMyPayments = async (customerId: string) => {
  return prisma.payment.findMany({
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

const getPaymentById = async (paymentId: string, userId: string) => {
  const payment = await prisma.payment.findFirstOrThrow({
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

export const paymentService = {
  createCheckoutSession,
  handelWebhook,
  getMyPayments,
  getPaymentById,
};