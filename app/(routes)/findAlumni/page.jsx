"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";

export default function FindAlumni() {
  const [alumni, setAlumni] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ industry: "", year: "", location: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAlumni();
  }, [search, filters, page]);

  const fetchAlumni = async () => {
    try {
      // Change the API path to match your existing route
      const response = await axios.get("/api/admin/alumni", {
        params: { search, ...filters, page },
      });
      console.log("📦 API Response:", response.data);
      setAlumni(response.data.alumni || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("❌ Error fetching alumni:", error);
    }
  };
  
  return (
    <div className="p-6">
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
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          className="border rounded px-2 py-1"
        >
          <option value="">Year</option>
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
            <Card key={alum._id}> {/* ✅ Fixed _id instead of id */}
              <CardContent className="p-4 text-center">
                <img
                  src={alum.photoUrl || "/placeholder.jpg"}
                  alt={alum.name}
                  className="w-16 h-16 rounded-full mx-auto object-cover"
                />
                <h3 className="text-lg font-bold">{alum.name}</h3>
                <p className="text-sm text-blue-600">{alum.role} at {alum.company}</p>
                <p className="text-gray-500">🎓 Class of {alum.batch}</p>
                <p className="text-gray-500">📍 {alum.location}</p>
                <Button className="mt-2">Connect</Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">No alumni found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}
