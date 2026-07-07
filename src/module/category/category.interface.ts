

export interface ICategory {
    name?: string;
    description?: string;
    limit?: number;
    page?: number;
    sortBy?: "title" | "createdAt" | "duration";
    sortOrder?: "asc" | "desc";
    searchItem?: string;
}