import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { service } from "../services/services.service";
import { ITechnicianQuery } from "./technician.interface";


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
                        name: { contains: query.searchItem, mode: "insensitive" }
                    }
                }, {
                    bio: {
                        contains: query.searchItem, mode: "insensitive"
                    }
                }
            ]
        })
    }
    if (query.location) {
        andConditions.push({
            location: {
                contains: query.location, mode: "insensitive"
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
            userId:id
        },
        include:{
            reviews:true,
        }
    })

    console.log("result", result)

    return result 
}


export const technicianService = {
    getAllTechnicians,
    getTechnicianById
};