import { rmSync } from "node:fs";
import { BookingStatus, Prisma, Role } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { service } from "../services/services.service";
import { IAvailabilitySlot, ITechnicianQuery, ITechnicianUpdate } from "./technician.interface";



const timeToMinutes = (time: string): number => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
};

const minutesToTime = (mins: number): string => {
    const h = Math.floor(mins / 60).toString().padStart(2, "0");
    const m = (mins % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
};

const combineDateAndTime = (date: string, time: string): Date => {
    const [h, m] = time.split(":").map(Number);
    const combined = new Date(date);
    combined.setHours(h, m, 0, 0);
    return combined;
};

const BLOCKING_STATUSES: BookingStatus[] = [
    "REQUESTED",
    "ACCEPTED",
    "PAID",
    "IN_PROGRESS",
];
const getAllTechnicians = async (query: ITechnicianQuery) => {

    const limit = query.limit ? Number(query.limit) : 10

    const page = query.page ? Number(query.page) : 1

    const skip = (page - 1) * limit

    const allowedSortFields = ["price", "title", "createdAt", "duration"] as const;

    const sortBy = allowedSortFields.includes(query.sortBy as any)
        ? query.sortBy
        : "createdAt";

    const sortOrder = query.sortOrder ? query.sortOrder : "desc"


    const andConditions: Prisma.TechnicianProfileWhereInput[] = [];


    if (query.searchItem) {
        andConditions.push({
            OR: [
                {
                    user: {
                        name: {
                            contains: query.searchItem,
                            mode: "insensitive"
                        }
                    }
                },
                {
                    bio: {
                        contains: query.searchItem,
                        mode: "insensitive"
                    }
                }
            ]
        })
    }
    if (query.location) {
        andConditions.push({
            location: {
                contains: query.location,
                mode: "insensitive"
            }
        })
    }

    if (query.category) {
        andConditions.push({
            services: {
                some: {
                    category: {
                        name: {
                            contains: query.category,
                            mode: "insensitive",
                        },
                    },
                },
            },
        });
    }


    if (query.minPrice || query.maxPrice) {
        andConditions.push({
            services: {
                some: {
                    price: {
                        gte: query.minPrice ? Number(query.minPrice) : undefined,
                        lte: query.maxPrice ? Number(query.maxPrice) : undefined,
                    },
                },
            },
        });
    }

    if (query?.rating) {
        andConditions.push({
            rating: {
                gte: Number(query.rating),
            },
        });
    }

    if (query.minExperience && query.maxExperience) {
        andConditions.push({
            experience: {
                gte: query.minExperience ? Number(query.minExperience) : undefined,
                lte: query.maxExperience ? Number(query.maxExperience) : undefined,
            },
        });
    }

    const technicians = await prisma.technicianProfile.findMany({
        where: {
            AND: andConditions
        }, include: {
            services: true,
            availability: true,
            user: {
                omit: {
                password: true,
            }
            }
        },

        skip: skip,
        take: limit,
        orderBy: {
            [sortBy as string]: sortOrder

        },
    })

    const totalServiceCount = await prisma.technicianProfile.count({
        where: {
            AND: andConditions
        }

    })


    return {
        data: technicians,
        meta: {
            page: page,
            limit: limit,
            total: totalServiceCount,
            totalPages: Math.ceil(totalServiceCount / limit)
        }
    }
}


const getTechnicianById = async (id: string) => {

    const result = await prisma.technicianProfile.findUniqueOrThrow({
        where: {
            id
        },
        include: {
            services: true,
            availability: true,
            reviews: true,
            user: {
                select: {
                    avatar: true,
                    name: true,
               } 
            }
        }
    })


    return result
}


const updateTechnicianProfile = async (id: string, updateData: ITechnicianUpdate) => {

    const existingTechnician = await prisma.technicianProfile.findUnique({
        where: {
            userId: id
        }, include: {
            user: true
        }
    })

    if (!existingTechnician) {
        throw new Error(`Technician with ID ${id} not found`);
    }

    if (existingTechnician.user.role !== Role.TECHNICIAN) {
        throw new Error(`You are not authorized to update this technician profile`);
    }

    const result = await prisma.$transaction(async (tex) => {

        if (updateData.name) {
            await tex.user.update({
                where: {
                    id
                }, data: {
                    name: updateData.name,
                    avatar: updateData.avatar,
                    phone:updateData.phone
                }
            })
        }


        await tex.technicianProfile.update({
            where: {
                userId: id
            },
            data: {
                bio: updateData.bio,
                experience: updateData.experience,
                location: updateData.location
            }

        });
    

        return await tex.technicianProfile.findUnique({
            where: {
                userId: id
            }, include: {
                user: {
                    omit: {
                        password: true,
                    },
                },
            },

        })


    })

    return result
}




interface IBookingQuery {
    page?: string | number;
    limit?: string | number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    status?: BookingStatus;
}

export const getTechnicianBooking = async (tecId: string, query: IBookingQuery) => {
    const limit = query.limit ? Number(query.limit) : 10;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * limit;

    const sortBy = query.sortBy || "createdAt";
    const sortOrder = query.sortOrder || "desc";


    const technicianProfile = await prisma.technicianProfile.findUnique({
        where: {
            userId: tecId,
        },
    });

    if (!technicianProfile) {
        throw new Error("Technician Profile Not Found");
    }

    // 2. Build Where Conditions for Booking
    const whereConditions: Prisma.BookingWhereInput = {
        technicianId: technicianProfile.id,
    };

    // Add Status Filter if provided in query
    if (query.status) {
        whereConditions.status = query.status;
    }

    // 3. Fetch Bookings and Total Count concurrently using Promise.all
    const [booking, totalBooking] = await Promise.all([prisma.booking.findMany({
        where: whereConditions,
        include: {
            customer: {
                omit: {
                    password: true,
                },
            },
            review: true,
            payment: true,
            service: true,
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    }),


    prisma.booking.count({
        where: whereConditions,
    }),
    ]);


    return {
        data: booking,
        meta: {
            page,
            limit,
            total: totalBooking,
            totalPages: Math.ceil(totalBooking / limit),
        },
    };
};

const updateTechnicianBookingStatus = async (userId: string, bookingId: string, action: BookingStatus) => {

    const technicianProfile = await prisma.technicianProfile.findUniqueOrThrow({
        where: { userId },
    });

    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingId
        },
    });

    if (!booking) {
        throw new Error("Booking not found");
    }

    if (booking.technicianId !== technicianProfile.id) {
        throw new Error("You are not allowed to update this booking");
    }

    if (action === BookingStatus.IN_PROGRESS) {
        if (booking.status !== BookingStatus.PAID) {
            throw new Error("Booking must be paid before starting.");
        }
    }

    if (action === BookingStatus.COMPLETED) {
        if (booking.status !== BookingStatus.IN_PROGRESS) {
            throw new Error("Booking must be in progress before completing.");
        }
    }

    const updatedBooking = await prisma.booking.update({
        where: {
            id: bookingId
        },
        data: {
            status: action
        },
    });

    return updatedBooking;
};


const updateAvailability = async (userId: string, slots: IAvailabilitySlot[]) => {
    const technicianProfile = await prisma.technicianProfile.findUnique({
        where: { userId },
    });
    if (!technicianProfile) {
        throw new Error("Not found technicianProfile")
    }

    // delete old availability
    await prisma.availability.deleteMany({
        where: {
            technicianId: technicianProfile.id
        },
    });



    await prisma.availability.createMany({
        data: slots.map((slot) => ({
            technicianId: technicianProfile.id,
            dayOfWeek: slot.dayOfWeek,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: slot.isAvailable ?? true,
        })),
    });

    const result = await prisma.availability.findMany({
        where: {
            technicianId: technicianProfile.id
        },
    });

    return result;
};


const getAvailableSlots = async (
    technicianId: string,
    date: string,       // "2026-08-15"
    serviceId: string
) => {
    const technicianProfile = await prisma.technicianProfile.findUnique({
        where: { id: technicianId },
    });
    if (!technicianProfile) {
        throw new Error("Technician not found");
    }

    const service = await prisma.service.findUnique({
        where: { id: serviceId },
    });
    if (!service) {
        throw new Error("Service not found");
    }

    const dayOfWeek = new Date(date).getDay();
    const durationMinutes = service.duration ?? 60;

    const availability = await prisma.availability.findMany({
        where: {
            technicianId,
            dayOfWeek,
            isAvailable: true,
        },
    });

    // step 1: generate candidate slots (still as "HH:mm" strings) from weekly pattern
    const candidateSlots: { startTime: string; endTime: string }[] = [];

    for (const row of availability) {
        const startMins = timeToMinutes(row.startTime);
        const endMins = timeToMinutes(row.endTime);

        let cursor = startMins;
        while (cursor + durationMinutes <= endMins) {
            candidateSlots.push({
                startTime: minutesToTime(cursor),
                endTime: minutesToTime(cursor + durationMinutes),
            });
            cursor += durationMinutes;
        }
    }

    // step 2: fetch that day's existing bookings for this technician,
    // including each booking's own service duration (needed to know its real end time)
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const existingBookings = await prisma.booking.findMany({
        where: {
            technicianId,
            status: { in: BLOCKING_STATUSES },
            scheduledAt: {
                gte: dayStart,
                lte: dayEnd,
            },
        },
        select: {
            scheduledAt: true,
            service: { select: { duration: true } },
        },
    });

    // step 3: filter out candidate slots that overlap an existing booking
    const freeSlots = candidateSlots.filter((slot) => {
        const slotStart = combineDateAndTime(date, slot.startTime);
        const slotEnd = combineDateAndTime(date, slot.endTime);

        const overlaps = existingBookings.some((booking) => {
            const bookingStart = booking.scheduledAt;
            const bookingDuration = booking.service?.duration ?? 60;
            const bookingEnd = new Date(
                bookingStart.getTime() + bookingDuration * 60000
            );
            return slotStart < bookingEnd && slotEnd > bookingStart;
        });

        return !overlaps;
    });

    return freeSlots;
};


const deleteService = async (serviceId: string, technicianUserId: string) => {
    console.log(serviceId)
    const technician = await prisma.technicianProfile.findUnique({
        where: { userId: technicianUserId },
    });
    if (!technician) throw new Error("Technician profile not found");

    const existing = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!existing) throw new Error("Service not found");
    if (existing.technicianId !== technician.id) {
        throw new Error("Not authorized to delete this service");
    }

    const bookingCount = await prisma.booking.count({ where: { serviceId } });
    if (bookingCount > 0) {
        throw new Error(
            "This service has existing bookings and can't be deleted. Remove it from public listing instead, or contact support."
        );
    }

    return prisma.service.delete({ where: { id: serviceId } });
};



const getDashboardStats = async (technicianUserId: string) => {
    const technician = await prisma.technicianProfile.findUnique({
        where: { userId: technicianUserId },
    });
    if (!technician) throw new Error("Technician profile not found");

    const [upcomingJobs, pendingRequests, earningsAggregate] = await Promise.all([
        prisma.booking.findMany({
            where: {
                technicianId: technician.id,
                status: {
                    in:
                        ["ACCEPTED", "PAID", "IN_PROGRESS"]
                },
                scheduledAt: { gte: new Date() },
            },
            include: {
                customer: {
                    select: { id: true, name: true, phone: true }
                },
                service: { select: { id: true, title: true, price: true } },
            },
            orderBy: { scheduledAt: "asc" },
            take: 5,
        }),
        prisma.booking.count({
            where: {
                technicianId: technician.id,
                status: "REQUESTED",
            },
        }),
        prisma.payment.aggregate({
            _sum: {
                amount: true
            },
            where: {
                status: "COMPLETED",
                booking: {
                    technicianId: technician.id,
                    status: "COMPLETED",
                },
            },
        }),
    ]);

    return {
        upcomingJobs,
        pendingRequestsCount: pendingRequests,
        totalEarnings: earningsAggregate._sum.amount ?? 0,
    };
};




export const technicianService = {
    getAllTechnicians,
    getTechnicianById,
    updateTechnicianProfile,
    getTechnicianBooking,
    updateTechnicianBookingStatus,
    updateAvailability,
    getAvailableSlots,
    deleteService,
    getDashboardStats

};