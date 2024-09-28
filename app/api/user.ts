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

export const fetchUsers = async (page = 1, limit = 10, search = ''): Promise<FetchUsersResponse> => {
  const response = await fetch(`http://localhost:3001/api/admin/users?page=${page}&limit=${limit}&search=${search}`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`http://localhost:3001/api/admin/users/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
};
