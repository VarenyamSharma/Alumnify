"use client";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { GraduationCap, MapPin } from "lucide-react";
import { debounce } from "lodash";
import axios from "axios";

export default function FindAlumni() {
  const [alumni, setAlumni] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ industry: "", batch: "", location: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 6;

  const handleConnect = (alum) => {
    const email = alum.email; // Ensure the email is part of the alumni data
    const subject = encodeURIComponent("Connection Request");
    const body = encodeURIComponent(`Hi ${alum.name},\n\nI would like to connect with you.`);
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

    window.open(mailtoLink, '_blank');
  };

  const fetchAlumni = useCallback(
    debounce(async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: itemsPerPage.toString(),
          ...(search && { search }),
          ...(filters.industry && { industry: filters.industry }),
          ...(filters.batch && { batch: filters.batch }),
          ...(filters.location && { location: filters.location }),
        });

        const response = await axios.get(`/api/alumni?${params}`);
        setAlumni(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching alumni:", error);
      } finally {
        setLoading(false);
      }
    }, 300),
    [search, filters, page]
  );

  useEffect(() => {
    fetchAlumni();
    return () => {
      if (fetchAlumni.cancel) fetchAlumni.cancel();
    };
  }, [search, filters, page, fetchAlumni]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-500">Find Alumni</h1>

      {/* 🔎 **Filters Section** */}
      <div className="flex space-x-4 mb-4">
        <Input
          placeholder="Search by name, company, or job profile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        {/* 🏢 Industry Filter */}
        <select
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
          className="border rounded px-2 py-1"
        >
          <option value="">Industry</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Management">Management</option>
        </select>

        {/* 🎓 Batch Filter */}
        <select
          value={filters.batch}
          onChange={(e) => setFilters({ ...filters, batch: e.target.value })}
          className="border rounded px-2 py-1"
        >
          <option value="">Batch</option>
          {Array.from({ length: 10 }, (_, i) => 2015 + i).map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>

        {/* 📍 Location Filter */}
        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="border rounded px-2 py-1"
        >
          <option value="">Location</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Pune">Pune</option>
          <option value="Noida">Noida</option>
          <option value="Gurgaon">Gurgaon</option>
        </select>
      </div>

      {/* 🎓 **Alumni List** */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 text-center">Loading...</div>
        ) : alumni.length > 0 ? (
          alumni.map((alum) => (
            <Card key={alum._id} className="shadow-md rounded-lg border w-full max-w-sm p-4">
              <CardContent>
                <div className="flex items-center justify-between">
                  <img
                    src={alum.photoUrl || "/placeholder.jpg"}
                    alt={alum.name}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <Button 
                    className="text-white bg-blue-500 font-semibold hover:bg-blue-600 w-48"
                    onClick={() => handleConnect(alum)}
                    
                  >
                    Connect
                  </Button>
                </div>

                <div className="mt-3">
                  <h3 className="text-lg font-semibold">{alum.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">
                    {alum.role} at {alum.company}
                  </p>
                  <div className="text-gray-500 text-sm flex flex-col space-y-1 mt-1">
                    <p className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" /> Class of {alum.batch}
                    </p>
                    <p className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {alum.location || "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">No alumni found.</p>
        )}
      </div>

      {/* 📖 **Pagination Section** */}
      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  onClick={() => setPage(pageNum)}
                  className={page === pageNum ? "bg-blue-500 text-white" : ""}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
