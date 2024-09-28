"use client"
import { addProvider, Provider } from "@/app/api/provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner" // Assuming you're using sonner for toast notifications
import { useRouter } from "next/navigation" // Import for navigation

export default function FormProvider() {
  const router = useRouter(); // Initialize Next.js router for navigation

  const [formData, setFormData] = useState<Provider>({
    id: 0,
    providerName: "",
    mobileNo: 0,
    address: "",
    latitude: 0,
    longitude: 0
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await addProvider(formData); // Send formData to API
      if (response.success) {
        setFormData({
          id: 0,
          providerName: "",
          mobileNo: 0,
          address: "",
          latitude: 0,
          longitude: 0
        });

        
        toast.success("Provider added successfully", {
          description: "The provider has been successfully created.",
        });
        router.push('/dashboard/providers'); 
        
      } else {
        
        toast.error("Failed to add provider", {
          description: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error adding provider:", error);

      toast.error("Error: Failed to add provider", {
        description: "An error occurred. Please check your network and try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        <div className="mb-4">
        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Provider name
          </label>
          <Input
            className="bg-white"
            placeholder="Enter provider name"
            type="text"
            name="providerName"
            value={formData.providerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Mobile number
          </label>
          <Input
            className="bg-white"
            placeholder="Enter mobile number"
            type="number"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Address
          </label>
          <Input
            className="bg-white"
            placeholder="Enter address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Latitude
          </label>
          <Input
            className="bg-white"
            placeholder="Enter latitude"
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Longitude
          </label>
          <Input
            className="bg-white"
            placeholder="Enter longitude"
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/providers">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button type="submit">Create Provider</Button>
      </div>
    </form>
  );
}
