"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.technicianService = void 0;
const client_1 = require("../../../generated/prisma/client");
const prisma_1 = require("../../lib/prisma");
const getAllTechnicians = async (query) => {
    const limit = query.limit ? Number(query.limit) : 10;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * limit;
    const allowedSortFields = ["price", "title", "createdAt", "duration"];
    const sortBy = allowedSortFields.includes(query.sortBy)
        ? query.sortBy
        : "createdAt";
    const sortOrder = query.sortOrder ? query.sortOrder : "desc";
    const andConditions = [];
    if (query.searchItem) {
        andConditions.push({
            OR: [
                {
                    user: {
                        name: { contains: query.searchItem, mode: "insensitive" }
                    }
                }, {
                    bio: {
                        contains: query.searchItem, mode: "insensitive"
                    }
                }
            ]
        });
    }
    if (query.location) {
        andConditions.push({
            location: {
                contains: query.location, mode: "insensitive"
            }
        });
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
    const technicians = await prisma_1.prisma.technicianProfile.findMany({
        where: {
            AND: andConditions
        },
        skip: skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        },
    });
    const totalServiceCount = await prisma_1.prisma.technicianProfile.count({
        where: {
            AND: andConditions
        }
    });
    return {
        data: technicians,
        meta: {
            page: page,
            limit: limit,
            total: totalServiceCount,
            totalPages: Math.ceil(totalServiceCount / limit)
        }
    };
};
const getTechnicianById = async (id) => {
    const result = await prisma_1.prisma.technicianProfile.findUniqueOrThrow({
        where: {
            userId: id
        },
        include: {
            reviews: true,
        }
    });
    console.log("result", result);
    return result;
};
const updateTechnicianProfile = async (id, updateData) => {
    const existingTechnician = await prisma_1.prisma.technicianProfile.findUnique({
        where: {
            userId: id
        }, include: {
            user: true
        }
    });
    if (!existingTechnician) {
        throw new Error(`Technician with ID ${id} not found`);
    }
    if (existingTechnician.user.role !== client_1.Role.TECHNICIAN) {
        throw new Error(`You are not authorized to update this technician profile`);
    }
    const result = await prisma_1.prisma.$transaction(async (tex) => {
        if (updateData.name) {
            await tex.user.update({
                where: {
                    id
                }, data: {
                    name: updateData.name
                }
            });
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
        });
    });
    return result;
};
const getTechnicianBooking = async (tecId) => {
    const technicianProfile = await prisma_1.prisma.technicianProfile.findUnique({
        where: {
            userId: tecId
        },
    });
    if (!technicianProfile) {
        throw new Error("Not Found technician Profile");
    }
    const result = await prisma_1.prisma.booking.findMany({
        where: {
            technicianId: technicianProfile.id,
        },
        include: {
            customer: {
                omit: {
                    password: true
                }
            },
            review: true,
            payment: true,
            service: true
        }
    });
    console.log(result);
    return result;
};
const updateTechnicianBookingStatus = async (userId, bookingId, action) => {
    const technicianProfile = await prisma_1.prisma.technicianProfile.findUniqueOrThrow({
        where: { userId },
    });
    const booking = await prisma_1.prisma.booking.findUnique({
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
    if (action === client_1.BookingStatus.IN_PROGRESS) {
        if (booking.status !== client_1.BookingStatus.PAID) {
            throw new Error("Booking must be paid before starting.");
        }
    }
    if (action === client_1.BookingStatus.COMPLETED) {
        if (booking.status !== client_1.BookingStatus.IN_PROGRESS) {
            throw new Error("Booking must be in progress before completing.");
        }
    }
    const updatedBooking = await prisma_1.prisma.booking.update({
        where: {
            id: bookingId
        },
        data: {
            status: action
        },
    });
    return updatedBooking;
};
const updateAvailability = async (userId, slots) => {
    const technicianProfile = await prisma_1.prisma.technicianProfile.findUniqueOrThrow({
        where: { userId },
    });
    // delete old availability
    await prisma_1.prisma.availability.deleteMany({
        where: { technicianId: technicianProfile.id },
    });
    await prisma_1.prisma.availability.createMany({
        data: slots.map((slot) => ({
            technicianId: technicianProfile.id,
            dayOfWeek: slot.dayOfWeek,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: slot.isAvailable ?? true,
        })),
    });
    const result = await prisma_1.prisma.availability.findMany({
        where: {
            technicianId: technicianProfile.id
        },
    });
    return result;
};
exports.technicianService = {
    getAllTechnicians,
    getTechnicianById,
    updateTechnicianProfile,
    getTechnicianBooking,
    updateTechnicianBookingStatus,
    updateAvailability
};
//# sourceMappingURL=technician.service.js.map