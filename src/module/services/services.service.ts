import { prisma } from "../../lib/prisma";
import { IService, IServiceQuery,  } from "./services.interface";


const createService = async (payload: IService, technicianId: string) => {
    const { categoryId, title, description, price, duration } = payload;
    if (!categoryId || !title || !price || !duration) {
        throw new Error("All fields are required")
    }
    console.log(technicianId)
    const technician = await prisma.technicianProfile.findUnique({
        where: { userId:technicianId }
    })
     

    if (!technician) {
        throw new Error("Technician profile not found ! pleace create your profile first")
    }
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        }

    })
    if (!category) {
        throw new Error("Category not found")
    }

    const result = await prisma.service.create({
        data: {
            technicianId:technician.id,
            categoryId,
            title,
            description,
            price,
            duration
        }


    })
    return result

};

const getAllService = async (query:IServiceQuery) => {
    
    const limit = query.limit ? parseInt(query.limit) : 10;
    const  page = query.page ?
    
}


export const service = {
    createService,
    getAllService,
}