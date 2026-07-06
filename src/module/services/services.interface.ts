import { ServiceWhereInput } from "../../../generated/prisma/models";

export interface IService{
    categoryId: string;
    title: string;
    description: string;
    price: number;
    duration: number;
}


export interface IServiceQuery {
  searchTerm?: string;

  category?: string;
  location?: string;

  minPrice?: string;
  maxPrice?: string;

  page?: string;
  limit?: string;

  sortBy?: string;
  sortOrder?: "asc" | "desc";
}