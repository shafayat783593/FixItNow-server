import { prisma } from "../../lib/prisma"


const createCategories = async (name:string,description:string) => {
    
    if (!name) {
        throw new Error("Category name is required")

    }
    const existing = await prisma.category.findUnique({
        where: { name }
    })
    if (existing) {
        throw new Error("Category already exists")
    }
    const result = await prisma.category.create({
        data: {
            name,
            description
        }
    })

    return result
}

// const getAllCategories = async()

export const categoryService = {
    createCategories,
}