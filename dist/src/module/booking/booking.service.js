"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const prisma_1 = require("../../lib/prisma");
const createBooking = async (customerId, payload) => {
    const { serviceId, scheduledAt, address, notes } = payload;
    const service = await prisma_1.prisma.service.findUnique({
        where: { id: serviceId },
    });
    if (!service) {
        throw new Error("Service not found");
    }
    const result = await prisma_1.prisma.booking.create({
        data: {
            customerId,
            technicianId: service.technicianId,
            serviceId,
            scheduledAt: new Date(scheduledAt),
            address,
            notes,
            status: "REQUESTED",
        },
    });
    return result;
};
const getMyBookings = async (customerId) => {
    const result = prisma_1.prisma.booking.findMany({
        where: {
            customerId
        },
        include: {
            service: {
                include: {
                    category: true
                }
            },
            technician: true,
            payment: true,
        },
    });
    return result;
};
const getBookingById = async (bookingId) => {
    const booking = await prisma_1.prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
            technician: {
                include: {
                    user: true
                }
            },
            service: true,
            payment: true,
            customer: true,
            review: true
        }
    });
    return booking;
};
const cancelBooking = async (bookingId, customerId) => {
    const booking = await prisma_1.prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking)
        throw new Error("Booking not found");
    if (booking.customerId !== customerId)
        throw new Error("Not your booking");
    // only allow cancel before IN_PROGRESS
    const nonCancellable = ["IN_PROGRESS", "COMPLETED", "CANCELLED"];
    if (nonCancellable.includes(booking.status)) {
        throw new Error(`Cannot cancel a booking that is already ${booking.status}`);
    }
    return prisma_1.prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CANCELLED" },
    });
};
exports.bookingService = {
    createBooking,
    getMyBookings,
    getBookingById,
    cancelBooking,
};
//# sourceMappingURL=booking.service.js.map