"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const enums_1 = require("../../../generated/prisma/enums");
const prisma_1 = require("../../lib/prisma");
const giveReviewOnTechnician = async (userId, bookingId, rating, comment) => {
    const booking = await prisma_1.prisma.booking.findUnique({
        where: {
            id: bookingId
        },
        include: {
            review: true
        },
    });
    if (!booking) {
        throw new Error("Booking not found");
    }
    if (booking.customerId !== userId) {
        throw new Error("You are not the customer for this booking");
    }
    if (booking.status !== enums_1.BookingStatus.COMPLETED) {
        throw new Error("cannot review a booking that is  Job must be completed first");
    }
    if (booking.review) {
        throw new Error("You have already reviewed this booking");
    }
    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
    }
    const result = await prisma_1.prisma.$transaction(async (tex) => {
        //   create review  
        const review = await tex.review.create({
            data: {
                bookingId: booking.id,
                customerId: userId,
                technicianId: booking.technicianId,
                rating,
                comment,
            },
        });
        const aggregate = await tex.review.aggregate({
            where: {
                technicianId: booking.technicianId
            },
            _avg: {
                rating: true
            },
            _count: {
                rating: true
            },
        });
        await tex.technicianProfile.update({
            where: {
                id: booking.technicianId
            },
            data: {
                rating: aggregate._avg.rating ?? 0,
                totalReviews: aggregate._count.rating,
            },
        });
        return review;
    });
    return result;
};
exports.reviewService = {
    giveReviewOnTechnician
};
//# sourceMappingURL=review.service.js.map