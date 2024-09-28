import { compare } from "bcrypt"

export interface Provider {
    id:number
    providerName:string
    mobileNo:number
    address:string
    latitude:number
    longitude:number
}

export type AddProvider = {
    id:number
    providerName:string
    mobileNo:number
    address:string
    latitude:number
    longitude:number
}

interface FetchProviderResponse{
    success: boolean;
    message: string;
    data: {
      providers: Provider[];
      meta: {
        totalProviders: number;
        currentPage: number;
        totalPages: number;
      };
    };
}


export const fetchProviders = async(page =1, limit =10, search =""):Promise<FetchProviderResponse> =>{
    const response = await fetch(`http://localhost:3001/api/providers?page=${page}&limit=${limit}&search=${search}`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
}

export const addProvider = async (data: Provider): Promise<any> => {
    try {
      const response = await fetch(`http://localhost:3001/api/providers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Convert formData into JSON string
      });
  
      if (!response.ok) {

        console.log("error", response);
        
      }
  
      return response.json(); // Parse the response as JSON
    } catch (error) {
      console.error("Error adding provider:", error);
      throw error; // Rethrow the error to be caught in the component
    }
  };

  export const deleteProvider = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/providers/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete provider");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  export const getProviderById = async (id:string)=>{
    try {
      const response = await fetch(`http://localhost:3001/api/providers/${id}`)
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }