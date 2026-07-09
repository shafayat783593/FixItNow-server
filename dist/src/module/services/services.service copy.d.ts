import { IService, IServiceQuery } from "./services.interface";
export declare const service: {
    createService: (payload: IService, technicianId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        title: string;
        description: string | null;
        price: number;
        duration: number | null;
        categoryId: string;
    }>;
    getAllService: (query: IServiceQuery) => Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            title: string;
            description: string | null;
            price: number;
            duration: number | null;
            categoryId: string;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
};
//# sourceMappingURL=services.service%20copy.d.ts.map