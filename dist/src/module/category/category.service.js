"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const prisma_1 = require("../../lib/prisma");
const createCategories = async (name, description) => {
    if (!name) {
        throw new Error("Category name is required");
    }
    const existing = await prisma_1.prisma.category.findUnique({
        where: { name }
    });
    if (existing) {
        throw new Error("Category already exists");
    }
    const result = await prisma_1.prisma.category.create({
        data: {
            name,
            description
        }
    });
    return result;
};
const getAllCategories = async (query) => {
    const limit = query.limit ? Number(query.limit) : 10;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * limit;
    const allowedSortFields = ["title", "createdAt", "duration"];
    const sortBy = allowedSortFields.includes(query.sortBy)
        ? query.sortBy
        : "createdAt";
    const sortOrder = query.sortOrder ? query.sortOrder : "desc";
    const andConditions = [];
    if (query.searchItem) {
        andConditions.push({
            OR: [
                {
                    name: {
                        contains: query.searchItem,
                        mode: "insensitive"
                    }
                },
                {
                    description: {
                        contains: query.searchItem,
                        mode: "insensitive"
                    }
                }
            ]
        });
    }
    if (query.name) {
        andConditions.push({
            name: {
                contains: query.name,
                mode: "insensitive"
            }
        });
    }
    if (query.description) {
        andConditions.push({
            description: {
                contains: query.description,
                mode: "insensitive"
            }
        });
    }
    const result = await prisma_1.prisma.category.findMany({
        where: {
            AND: andConditions
        },
        skip: skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        },
    });
    const totalCategoriesCount = await prisma_1.prisma.category.count({
        where: {
            AND: andConditions
        }
    });
    return {
        data: result,
        total: totalCategoriesCount,
        page: page,
        limit: limit,
        totalPages: Math.ceil(totalCategoriesCount / limit)
    };
};
exports.categoryService = {
    createCategories,
    getAllCategories
};
//# sourceMappingURL=category.service.js.map