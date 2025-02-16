"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
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

export default function FindAlumni() {
  const [alumni, setAlumni] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    industry: "",
    batch: "",
    location: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAlumni = useCallback(
    debounce(async () => {
      try {
        const params = { search, ...filters, page };
        Object.keys(params).forEach((key) => {
          if (params[key] === "" || params[key] === null || params[key] === undefined) {
            delete params[key];
          }
        });

        const response = await axios.get("/api/admin/alumni", { params });

        console.log("📦 API Response:", response.data);
        setAlumni(response.data.alumni || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("❌ Error fetching alumni:", error);
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

      {/* Search & Filters */}
      <div className="flex space-x-4 mb-4">
        <Input
          placeholder="Search alumni by name, company, or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
          className="border rounded px-2 py-1"
        >
          <option value="">Industry</option>
          <option value="Tech">Tech</option>
          <option value="Finance">Finance</option>
        </select>
        <select
          value={filters.batch}
          onChange={(e) => setFilters({ ...filters, batch: e.target.value })}
          className="border rounded px-2 py-1"
        >
          <option value="">Batch</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="border rounded px-2 py-1"
        >
          <option value="">Location</option>
          <option value="San Francisco">San Francisco</option>
          <option value="New York">New York</option>
        </select>
      </div>

      {/* Alumni Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alumni.length > 0 ? (
          alumni.map((alum) => (
            <Card
              key={alum._id}
              className="shadow-md rounded-lg border w-full max-w-sm p-4"
            >
              <CardContent>
                {/* Top row: Profile Picture (left) and Connect button (right) */}
                <div className="flex items-center justify-between">
                  <img
                    src={alum.photoUrl || "/placeholder.jpg"}
                    alt={alum.name || "Alumni"}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <Button className="text-white bg-blue-500 font-semibold hover:bg-blue-600 w-48">
                    Connect
                  </Button>
                </div>

                {/* Alumni Details (below profile picture) */}
                <div className="mt-3">
                  <h3 className="text-lg font-semibold">{alum.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">
                    {alum.role} at {alum.company}
                  </p>
                  <div className="text-gray-500 text-sm flex flex-col space-y-1 mt-1">
                    <p className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" /> Class of{" "}
                      {alum.batch}
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
          <p className="col-span-3 text-center text-gray-500">
            No alumni found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            {/* Previous Page Button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    onClick={() => setPage(pageNum)}
                    className={page === pageNum ? "bg-blue-500 text-white" : ""}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            {/* Ellipsis (Show only if too many pages) */}
            {totalPages > 5 && page > 3 && page < totalPages - 2 && (
              <PaginationItem>
                <span className="px-3">...</span>
              </PaginationItem>
            )}

            {/* Next Page Button */}
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
