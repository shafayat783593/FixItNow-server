
export interface ITechnicianQuery {
  searchItem?: string;

  location?: string;

  minExperience?: string;
  maxExperience?: string;

  rating?: string;

  category?: string;

  page?: string;
  limit?: string;

  sortBy?: string;
  sortOrder?: "asc" | "desc";
}