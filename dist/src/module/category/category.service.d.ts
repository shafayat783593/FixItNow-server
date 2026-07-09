import { ICategory } from "./category.interface";
export declare const categoryService: {
    createCategories: (name: string, description: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
    }>;
    getAllCategories: (query: ICategory) => Promise<{
        data: {
            name: string;
            id: string;
            createdAt: Date;
            description: string | null;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
};
//# sourceMappingURL=category.service.d.ts.map