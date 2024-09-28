import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { getProviderById } from "@/app/api/provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DataTable } from "./data-table";
import { fetchMachineryByProvider } from "@/app/api/machinery";
import { columns } from "./columns";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [provider] = await Promise.all([getProviderById(id)]);

  const data = await fetchMachineryByProvider(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Providers", href: "/dashboard/providers" },
          {
            label: "View Provider",
            href: `/dashboard/providers/${id}/view`,
            active: true,
          },
        ]}
      />
      <div className="inline-block min-w-full align-middle">
        <div className="flex justify-between mt-3 mb-4">
          <p className="flex items-center">
            {" "}
            <span className="font-semibold">
              <User />{" "}
            </span>
            <span className="font-normal ml-2">
              {" "}
              {provider.data.providerName}
            </span>{" "}
          </p>
          <p className="flex items-center">
            {" "}
            <span className="font-semibold">
              <Phone />{" "}
            </span>
            <span className="font-normal ml-2"> {provider.data.mobileNo}</span>{" "}
          </p>

          <p className="flex items-center">
            {" "}
            <span className="font-semibold">
              <MapPin />{" "}
            </span>
            <span className="font-normal ml-2"> {provider.data.address}</span>{" "}
          </p>
        </div>

        <Separator />

        <div className="flex justify-between mt-3 ">
          <Input
            className=" p-2 rounded-lg w-1/3"
            placeholder="Search machinary..."
          />
          <Link href={`/dashboard/providers/${id}/add`}>
            <Button>Add Machinery</Button>
          </Link>
        </div>

        <div className="container mx-auto py-10">
          
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </main>
  );
}
