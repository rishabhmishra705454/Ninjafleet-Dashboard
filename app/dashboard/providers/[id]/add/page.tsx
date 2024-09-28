"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MapPicker from "./map-picker";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { addMachineryByProvider, Machinery } from "@/app/api/machinery";
import { toast } from "sonner";
import { Router } from "next/router";
import { useRouter } from "next/navigation";


// Define schema validation using Zod
const formSchema = z.object({
  providerId: z.any(),
  machineryName: z.string().min(2, "Name is too short").max(100),
  category: z.string().min(2, "Category is required"),
  model: z.string().optional(),
  capacity: z.string().optional(),
  condition: z.enum(["New", "Used", "Needs Maintenance"]),
  fuelType: z.string().optional(),
  pricing: z.number(),
  isActive: z.boolean(),
  availabilityStart: z.string(),
  availabilityEnd: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  images: z.any().optional(),
  maintenanceSchedule: z.string().optional(),
  lastServiceDate: z.string().optional(),
  insuranceStatus: z.boolean(),
  usageRestrictions: z.string().optional(),
  availableDays: z.any().optional(),
  insuranceExpiry: z.string().optional(),
  operatorRequired: z.boolean(),
});

export default function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
  const id = params.id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      providerId: id,
      machineryName: "",
      category: "",
      model: "",
      capacity: "",
      condition: "Used",
      fuelType: "",
      pricing: 0,
      isActive: true,
      availabilityStart: "",
      availabilityEnd: "",
      latitude: 0,
      longitude: 0,
      insuranceStatus: false,
      operatorRequired: false,
    },
  });

  const onSubmit= async (values: z.infer<typeof formSchema>) =>{
    console.log(values);

    const imageFiles = values.images as File[];

    const machineryData: Partial<Machinery> = {

      providerId: values.providerId,
      machineryName: values.machineryName,
      category: values.category,
      model: values.model,
      condition: values.condition,
      capacity:values.capacity,
      pricing: values.pricing,
      isActive: values.isActive,
      availabilityStart: values.availabilityStart,
      availabilityEnd: values.availabilityEnd,
      latitude: values.latitude,
      longitude: values.longitude,
      insuranceStatus: values.insuranceStatus,
      maintenanceSchedule: values.maintenanceSchedule,
      lastServiceDate: values.lastServiceDate,
      usageRestrictions: values.usageRestrictions,
      availableDays: values.availableDays,
      insuranceExpiry: values.insuranceExpiry,
      operatorRequired: values.operatorRequired,
    };

    try {
        const response = await addMachineryByProvider(machineryData,imageFiles);
        toast.success("Machinery added successfully", {
            description: "The machinery has been successfully created.",
          });
          router.push(`/dashboard/providers/${id}/view`);
    } catch (error) {
        toast.success("Something went wrong", );
    }
  }

  return (
    <main className=" w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/providers">
              Providers
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/dashboard/providers/${id}/view`}>
              View Provider
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>Add Machinery</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className=" mt-5 w-full">
        <Card>
          <CardContent className="mt-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="machineryName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Machinery Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter machinery name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Tractor, Harvester, etc."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter model" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Horsepower, etc." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Condition</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="New, Used, Needs Maintenance"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fuelType"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Fuel Type</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Diesel, Petrol, Electric"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="pricing"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Pricing (per hour)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            // Convert string input to a number
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            placeholder="Enter price"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Is Active?</FormLabel>
                        <FormControl>
                          <Checkbox
                            className="ml-2"
                            checked={field.value} // Bind boolean value to checked
                            onCheckedChange={field.onChange} // Use onCheckedChange for boolean handling
                            ref={field.ref}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="availabilityStart"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Availability Start</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="availabilityEnd"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Availability End</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="insuranceStatus"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Insurance Status</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value} // Use checked for boolean
                            onCheckedChange={field.onChange} // Handle changes correctly
                            ref={field.ref}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="operatorRequired"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Operator Required?</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value} // Use checked for boolean values
                            onCheckedChange={field.onChange} // Use onCheckedChange to handle changes
                            ref={field.ref}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Images</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          multiple // Allow multiple file uploads
                          accept="image/*"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
    
                            field.onChange(files); // Handle array of image URLs
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maintenanceSchedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maintenance Schedule</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastServiceDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Service Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="usageRestrictions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usage Restrictions</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter usage restrictions"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availableDays"
                  render={({ field }) => {
                    const [selectedDays, setSelectedDays] = useState<string[]>(
                      field.value || []
                    );

                    const handleDayChange = (day: string) => {
                      if (selectedDays.includes(day)) {
                        // Remove the day if it's already selected
                        const updatedDays = selectedDays.filter(
                          (selectedDay) => selectedDay !== day
                        );
                        setSelectedDays(updatedDays);
                        field.onChange(updatedDays); // Update form field value
                      } else {
                        // Add the day to selectedDays
                        const updatedDays = [...selectedDays, day];
                        setSelectedDays(updatedDays);
                        field.onChange(updatedDays); // Update form field value
                      }
                    };

                    return (
                      <FormItem>
                        <FormLabel>Available Days</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            {[
                              "Monday",
                              "Tuesday",
                              "Wednesday",
                              "Thursday",
                              "Friday",
                              "Saturday",
                              "Sunday",
                            ].map((day) => (
                              <div
                                key={day}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  checked={selectedDays.includes(day)}
                                  onCheckedChange={() => handleDayChange(day)}
                                  id={day}
                                />
                                <label htmlFor={day}>{day}</label>
                              </div>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="insuranceExpiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance Expiry</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="latitude"
                  render={() => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <MapPicker
                          onSelect={(lat, lng) => {
                            form.setValue("latitude", lat); // Set latitude
                            form.setValue("longitude", lng); // Set longitude
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
