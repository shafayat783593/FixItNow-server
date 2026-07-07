import { Result } from "pg"
import { Prisma, Role, UserStatus } from "../../../generated/prisma/client"
import { UserWhereInput } from "../../../generated/prisma/models"
import { prisma } from "../../lib/prisma"
import { IUpdateUser, IUser } from "./admin.interface"



const getAllUser = async (query: IUser) => {
console.log(query)
    const limit = query.limit ? Number(query.limit) : 10

    const page = query.page ? Number(query.page) : 1

    const skip = (page - 1) * limit

const allowedSortFields = ["name", "email", "createdAt"] as const;

const sortBy = allowedSortFields.includes(query.sortBy as any)
    ? query.sortBy
    : "createdAt";

    const sortOrder = query.sortOrder ? query.sortOrder : "desc"

    const andAllUser:Prisma.UserWhereInput[] = []

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
        })
    }
    if (query.email) {
        andAllUser.push({
            email: {
                contains: query.email,
                mode: "insensitive"
            }
        })
    }
    if (query.status) {
        andAllUser.push({
            status: {
                in: query.status
                    .split(",")
                    .map(status => status.trim() as UserStatus),
            },
        });
    }

    if (query.role) {
        andAllUser.push({
            role: query.role as Role,
        });
    }


    const result = await prisma.user.findMany({
        where: {
            AND: andAllUser,
        },
      include: {
            technicianProfile: true,
        },

        skip,
        take: limit,
        orderBy: {
            [sortBy as string]: sortOrder,
        },


    });
    const totalUser = await prisma.user.count({
        where: {
            AND: andAllUser
        },
        

    })


    return {
        data: result,
        meta: {
            page: page,
            limit: limit,
            total: totalUser,
            totalPages: Math.ceil(totalUser / limit)
        }
    }
}




const updateUser = async (id: string, payload: IUpdateUser) => {

    console.log("djlflf Id",id)
    const existingUser = await prisma.user.findUnique({
        where: {
            id,
        },
    });

    if (!existingUser) {
        throw new Error("User not found");
    }

    const result = await prisma.user.update({
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





export const adminService = {
    getAllUser,
    updateUser
}
