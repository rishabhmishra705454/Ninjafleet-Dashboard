import { BASE_URL } from "./api";

export interface Booking {
  id: number;
  userId: number;
  machineryId: number;
  providerId: number;
  landCoordinates: string;  // changed to lowercase "string"
  landArea: number;
  startDate: number;
  endDate: number;
  status: number;
  totalAmount: number;
  createdAt: number;
  updatedAt: number;
}

interface FetchBookingResponse {
  success: boolean;
  message: string;
  data: {
    bookings: Booking[];  // corrected key to "bookings"
    pagination: {
      totalItems: number;
      currentPage: number;
      totalPages: number;
      itemsPerPage: number;
    };
  };
}

export const fetchBookings = async (
  page = 1,
  limit = 10
): Promise<FetchBookingResponse | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/bookings?page=${page}&limit=${limit}`
    );

  
    const data = await response.json();
    return data.data.bookings;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return null;  // Return null if there's an error
  }
};
