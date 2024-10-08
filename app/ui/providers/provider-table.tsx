"use client";

import { deleteProvider, fetchProviders, Provider } from "@/app/api/provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash ,Eye} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default   function ProviderTable() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [providers, setProviders] = useState<Provider[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [message, setMessage] = useState("");
  

  const loadProviders =  async (page: number, search: string) => {
    try {
      const response = await fetchProviders(page, 10, search);
      if (response.success) {
        setProviders(response.data.providers);
        setTotalPages(response.data.meta.totalPages);
      }else{
        setMessage(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProviders(page, searchTerm);
  }, [page, searchTerm]);

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteProvider(id);
      if(response.success ===true){
        setProviders([]);
        loadProviders(page, searchTerm);
        toast.success(response.message);
      }else{
        toast.error(response.message);
      }
     
    } catch (error) {
      console.error(error);
    }
  };

 
  return (
    <div>
      <div className="inline-block min-w-full align-middle">
        <div className="flex justify-between mb-4">
          <Input
            type="text"
            className="border p-2 rounded-lg w-1/3"
            placeholder="Search by name, phone .."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Link href="/dashboard/providers/create"> <Button>Add Provider</Button> </Link>
        </div>

        <Table className="min-w-full ">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Provider Name</TableHead>
              <TableHead>Mobile No</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Latitude </TableHead>
              <TableHead>Longitude </TableHead>

              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
              {providers.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell className="font-medium">{provider.id}</TableCell>
                  <TableCell>{provider.providerName}</TableCell>
                  <TableCell>{provider.mobileNo}</TableCell>
                  <TableCell>{provider.address}</TableCell>
                  <TableCell>{provider.latitude}</TableCell>
                  <TableCell>{provider.longitude}</TableCell>
                  
                  <TableCell className="text-right">
                    {/* <Button onClick={() => handleDelete(user.id)}> */}
                   <Link href={`/dashboard/providers/${provider.id}/view`}><Button size="icon">
                        <Eye/>
                    </Button>
                    </Link> 
                    <Button onClick={()=>handleDelete(provider.id)} variant="outline" className="ms-2" size="icon">
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
        <p className=" text-center m-4">{message}</p>
         {/* Pagination */}
         <div className="mt-4 flex justify-between">
            <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </Button>
            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>
            <Button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
      </div>
    </div>
  );
}
