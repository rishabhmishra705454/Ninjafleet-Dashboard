export interface User {
  id: number;
  farmerName: string;
  mobileNo: string;
  aadharNo: string;
  aadharFront: string;
  aadharBack: string;
  address: string;
  totalLand: number;
  landType: string;
}

interface FetchUsersResponse {
  success: boolean;
  message: string;
  data: {
    users: User[];
    meta: {
      totalUsers: number;
      currentPage: number;
      totalPages: number;
    };
  };
}
import { BASE_URL } from "./api";

export const fetchUsers = async (page = 1, limit = 10, search = ''): Promise<FetchUsersResponse> => {
  const response = await fetch(`${BASE_URL}/api/admin/users?page=${page}&limit=${limit}&search=${search}`);
  return response.json();
};

export const deleteUser = async (id: number): Promise<FetchUsersResponse> => {
  const response = await fetch(`${BASE_URL}/api/admin/users/${id}`, { method: 'DELETE' });
  
  return response.json();
};
