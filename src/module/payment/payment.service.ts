

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
      include: { service: true, payment: true },
    });

    if (booking.customerId !== userId) {
      throw new Error("You are not allowed to pay for this booking");
    }

    if (booking.status !== BookingStatus.ACCEPTED) {
      throw new Error(`Cannot pay for a booking with status ${booking.status}`);
    }

    if (booking.payment) {
      throw new Error("Payment already exists for this booking");
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
      success_url: `${config.app_url}/booking/${booking.id}?success=true`,
      cancel_url: `${config.app_url}/booking/${booking.id}?success=false`,
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
        method: PaymentMethod.STRIPE,
        provider: session.id,
        status: PaymentStatus.PENDING,
      },
    });

    return session.url;
  });

  return {
    paymentUrl: transactionResult,
  };
};


export const paymentService = {
  createCheckoutSession,

};