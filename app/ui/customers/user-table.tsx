"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchUsers, deleteUser, User } from "@/app/api/user";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { Download, Trash } from "lucide-react";
import { BASE_URL } from "@/app/api/api";
import { toast } from "sonner"


export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [message, setMessage] = useState("");

  const loadUsers = async (page: number, search: string) => {
    try {
      const data = await fetchUsers(page, 10, search);
      if (data.success) {
        setUsers(data.data.users);
        setTotalPages(data.data.meta.totalPages);
      }else{
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers(page, searchTerm);
  }, [page, searchTerm]);

  const handleDelete = async (id: number) => {
    try {
      const data = await deleteUser(id);
      toast(data.message);
      setUsers([])
      loadUsers(page, searchTerm); // Refetch users after deletion


    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = (relativeUrl: string, filename: string) => {
    const url = `${BASE_URL}/${relativeUrl}`; // Prepend base URL to the relative URL
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  return (
    <div className="mt-6 ">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg ">
          <div className="flex justify-between mb-4">
            <Input
              type="text"
              className="border p-2 rounded-lg w-1/3"
              placeholder="Search by name, phone .."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table className="min-w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Farmer Name</TableHead>
                <TableHead>Mobile No</TableHead>
                <TableHead>Aadhar No</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Total Land </TableHead>
                <TableHead>Land Type </TableHead>

                <TableHead>Aadhar Photos</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.farmerName}</TableCell>
                  <TableCell>{user.mobileNo}</TableCell>
                  <TableCell>{user.aadharNo}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.totalLand} Acre</TableCell>
                  <TableCell>{user.landType}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleDownload(
                          user.aadharFront,
                          `Aadhar_Front_${user.id}.jpg`
                        );
                        handleDownload(
                          user.aadharBack,
                          `Aadhar_Back_${user.id}.jpg`
                        );
                      }}
                      size="icon"
                    >
                      {" "}
                      <Download />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => handleDelete(user.id)}>
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
    </div>
  );
}
