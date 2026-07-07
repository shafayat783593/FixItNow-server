
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


export interface ITechnicianUpdate {
  name?: string;
  bio?: string;
  experience?: number;
  location?: string;
 
}



export interface IBookingStatus{
  
}