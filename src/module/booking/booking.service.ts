import { BookingStatus } from "../../../generated/prisma/enums";
import { Prisma } from "../../client";
import { prisma } from "../../lib/prisma";
import { IBooking } from "./booking.interface";





const createBooking = async (customerId: string, payload: IBooking) => {
    const { serviceId, scheduledAt, address, notes } = payload;

    const service = await prisma.service.findUnique({
        where: { id: serviceId },
    });

    if (!service) {
        throw new Error("Service not found");
    }

    const result = await prisma.booking.create({
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


const getMyBookings = async ( query: Record<string, any>,customerId: string) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const sortBy = query.sortBy || "createdAt";
  const sortOrder = query.sortOrder === "asc" ? "asc" : "desc";

  const andConditions: Prisma.BookingWhereInput[] = [];


  andConditions.push({
    customerId,
  });


  if (query.status) {
    andConditions.push({
      status: query.status as BookingStatus,
    });
  }

  // Search
  if (query.searchItem) {
    andConditions.push({
      OR: [
        {
          service: {
            title: {
              contains: query.searchItem,
              mode: "insensitive",
            },
          },
        },
        {
          service: {
            description: {
              contains: query.searchItem,
              mode: "insensitive",
            },
          },
        },
        {
          technician: {
            user: {
              name: {
                contains: query.searchItem,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    });
  }

  const where: Prisma.BookingWhereInput = {
    AND: andConditions,
  };

  const data = await prisma.booking.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      service: {
        include: {
          category: true,
        },
      },
      technician: {
        include: {
          user: true,
        },
      },
      payment: true,
    },
  });

  const total = await prisma.booking.count({
    where,
  });

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
type Role = "ADMIN" | "TECHNICIAN" | "CUSTOMER";
const getBookingById = async (bookingId: string, userId: string, role: Role) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      technician: { include: { user: true } },
      service: true,
      payment: true,
      customer: true,
      review: true,
    },
  });

  if (!booking) throw new Error("Booking not found");

  const isOwner =
    booking.customerId === userId || booking.technicianId === userId;

  if (role !== "ADMIN" && !isOwner) {
    throw new Error("Not authorized to view this booking");
  }

  return booking;
};


const cancelBooking = async (bookingId:string, customerId:string) => {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

    if (!booking) throw new Error("Booking not found");
    if (booking.customerId !== customerId) throw new Error("Not your booking");

    // only allow cancel before IN_PROGRESS
    const nonCancellable = ["IN_PROGRESS", "COMPLETED", "CANCELLED"];
    if (nonCancellable.includes(booking.status)) {
        throw new Error(`Cannot cancel a booking that is already ${booking.status}`);
    }

    return prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CANCELLED" },
    });
};



const getDashboardStats = async (customerId: string) => {
    const [totalBookings, activeBookings, completedBookings, spendAggregate, recentBookings] =
        await Promise.all([
          prisma.booking.count({
            where: {
              customerId
            }
          }),
            prisma.booking.count({
                where: {
                    customerId,
                status: {
                  in: ["REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS"]
                },
                },
            }),
            prisma.booking.count({
              where: {
                customerId, status: "COMPLETED"
              },
            }),
            prisma.payment.aggregate({
                _sum: { amount: true },
                where: {
                    status: "COMPLETED",
                    booking: { customerId },
                },
            }),
            prisma.booking.findMany({
                where: { customerId },
                include: {
                  service: {
                    select: {
                      id: true, title: true, price: true
                    }
                  },
                  technician: {
                    include: { user: { select: { name: true } } }
                  },
                },
                orderBy: { createdAt: "desc" },
                take: 5,
            }),
        ]);

    return {
        totalBookings,
        activeBookings,
        completedBookings,
        totalSpent: spendAggregate._sum.amount ?? 0,
        recentBookings,
    };
};


export const bookingService = {
    createBooking,
    getMyBookings,
    getBookingById,
  cancelBooking,
    getDashboardStats

}