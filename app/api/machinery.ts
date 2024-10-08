import { BASE_URL } from "./api";

export type Machinery = {
  id: string;
  providerId: string;
  machineryName: string;
  category: string;
  model?: string;
  capacity?: string;
  condition: string;
  fuelType?: string;
  pricing: number;
  isActive: boolean;
  availabilityStart: string;
  availabilityEnd: string;
  latitude: number;
  longitude: number;
  images?: string[]; // Array of image URLs
  maintenanceSchedule?: string;
  lastServiceDate?: string;
  insuranceStatus: boolean;
  usageRestrictions?: string;
  availableDays?: string;
  insuranceExpiry?: string;
  operatorRequired?: boolean;
};

// Function to fetch machinery by provider ID
export const fetchMachineryByProvider = async (
  providerId: string
): Promise<Machinery[]> => {
  const response = await fetch(
    `${BASE_URL}/api/machinery/provider/${providerId}`
  );

  const data = await response.json();
  console.log(data);
  return data.data; // Assuming the API returns the data in this structure
};


export const getMachineryById = async ( machineryId: string): Promise<Machinery> =>{
  const response = await fetch(`${BASE_URL}/api/machinery/${machineryId}`);
  const data = await response.json();
  return data.data;
}


export const addMachineryByProvider = async (
  machinery: Partial<Machinery>,
  imageFiles: File[]
): Promise<Machinery> => {
  const formData = new FormData();
  formData.append("providerId", machinery.providerId!);
  formData.append("machineryName", machinery.machineryName!);
  formData.append("category", machinery.category!);
  formData.append("condition", machinery.condition!);
  formData.append("pricing", machinery.pricing!.toString());
  formData.append("isActive", machinery.isActive ? "1" : "0");
  formData.append("availabilityStart", machinery.availabilityStart!);
  formData.append("availabilityEnd", machinery.availabilityEnd!);
  formData.append("latitude", machinery.latitude!.toString());
  formData.append("longitude", machinery.longitude!.toString());
  formData.append("insuranceStatus", machinery.insuranceStatus ? "1" : "0");

  if (machinery.model) formData.append("model", machinery.model);
  if (machinery.capacity) formData.append("capacity", machinery.capacity);
  if (machinery.maintenanceSchedule)
    formData.append("maintenanceSchedule", machinery.maintenanceSchedule);
  if (machinery.lastServiceDate)
    formData.append("lastServiceDate", machinery.lastServiceDate);
  if (machinery.usageRestrictions)
    formData.append("usageRestrictions", machinery.usageRestrictions);
  if (machinery.availableDays)
    formData.append("availableDays", machinery.availableDays);
  if (machinery.insuranceExpiry)
    formData.append("insuranceExpiry", machinery.insuranceExpiry);
  if (machinery.operatorRequired)
    formData.append("operatorRequired", machinery.operatorRequired ? "1" : "0");

  // Append images
  imageFiles.forEach((file, index) => {
    formData.append("images", file); // Ensure field name matches your server
  });

  // Debugging: Log FormData keys and values
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  const response = await fetch(`${BASE_URL}/api/machinery`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text(); // Capture and log server error
    console.error(`Error response: ${errorText}`);
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};