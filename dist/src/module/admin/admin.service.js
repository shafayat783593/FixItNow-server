"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const prisma_1 = require("../../lib/prisma");
const getAllUser = async (query) => {
    console.log(query);
    const limit = query.limit ? Number(query.limit) : 10;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * limit;
    const allowedSortFields = ["name", "email", "createdAt"];
    const sortBy = allowedSortFields.includes(query.sortBy)
        ? query.sortBy
        : "createdAt";
    const sortOrder = query.sortOrder ? query.sortOrder : "desc";
    const andAllUser = [];
    if (query.searchUser) {
        andAllUser.push({
            OR: [
                {
                    name: {
                        contains: query.searchUser,
                        mode: "insensitive",
                    },
                },
                {
                    email: {
                        contains: query.searchUser,
                        mode: "insensitive",
                    },
                },
            ],
        });
    }
    if (query.name) {
        andAllUser.push({
            name: {
                contains: query.name,
                mode: 'insensitive'
            }
        });
    }
    if (query.email) {
        andAllUser.push({
            email: {
                contains: query.email,
                mode: "insensitive"
            }
        });
    }
    if (query.status) {
        andAllUser.push({
            status: {
                in: query.status
                    .split(",")
                    .map(status => status.trim()),
            },
        });
    }
    if (query.role) {
        andAllUser.push({
            role: query.role,
        });
    }
    const result = await prisma_1.prisma.user.findMany({
        where: {
            AND: andAllUser,
        },
        include: {
            technicianProfile: true,
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const totalUser = await prisma_1.prisma.user.count({
        where: {
            AND: andAllUser
        },
    });
    return {
        data: result,
        meta: {
            page: page,
            limit: limit,
            total: totalUser,
            totalPages: Math.ceil(totalUser / limit)
        }
    };
};
const updateUser = async (id, payload) => {
    console.log("djlflf Id", id);
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!existingUser) {
        throw new Error("User not found");
    }
    const result = await prisma_1.prisma.user.update({
        where: {
            id,
        },
        data: {
            role: payload.role,
            status: payload.status,
        },
        include: {
            technicianProfile: true,
        },
    });
    return result;
};
const getAllBookings = async (query) => {
    const limit = query.limit ? Number(query.limit) : 10;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * limit;
    const allowedSortFields = ["scheduledAt", "createdAt", "status"];
    const sortBy = allowedSortFields.includes(query.sortBy)
        ? query.sortBy
        : "createdAt";
    const sortOrder = query.sortOrder ? query.sortOrder : "desc";
    const andConditions = [];
    if (query.searchItem) {
        andConditions.push({
            OR: [
                {
                    customer: {
                        name: {
                            contains: query.searchItem,
                            mode: "insensitive"
                        },
                    },
                },
                {
                    customer: {
                        email: {
                            contains: query.searchItem,
                            mode: "insensitive"
                        },
                    },
                },
            ],
        });
    }
    if (query.status) {
        andConditions.push({
            status: {
                in: query.status.split(",").map((s) => s.trim()),
            },
        });
    }
    if (query.customerId) {
        andConditions.push({
            customerId: query.customerId
        });
    }
    const result = await prisma_1.prisma.booking.findMany({
        where: {
            AND: andConditions,
        },
        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true
                },
            },
            technician: true,
            service: {
                include: {
                    category: true
                }
            },
            payment: true,
            review: true,
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const totalBookings = await prisma_1.prisma.booking.count({
        where: { AND: andConditions },
    });
    return {
        data: result,
        meta: {
            page,
            limit,
            total: totalBookings,
            totalPages: Math.ceil(totalBookings / limit),
        },
    };
};
exports.adminService = {
    getAllUser,
    updateUser,
    getAllBookings
};
//# sourceMappingURL=admin.service.js.map