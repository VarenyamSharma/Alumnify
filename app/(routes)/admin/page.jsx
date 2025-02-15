"use client";

import { useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    batch: "",
    company: "",
    role: "",
    industry: "",
    location: "", // ✅ Added location
  });
  const [photoFile, setPhotoFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File is too large. Please choose a file under 5MB");
      e.target.value = '';
      return;
    }
    setPhotoFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      if (photoFile) {
        formDataToSend.append("photo", photoFile);
      }

      console.log("📤 Sending request to: /api/admin/alumni");
      console.log("📦 Form data:", Object.fromEntries(formDataToSend));

      const response = await axios.post("/api/admin/alumni", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Response:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.error);
      }

      alert("🎉 Alumni added successfully!");
      setFormData({ name: "", batch: "", company: "", role: "", industry: "", location: "" });
      setPhotoFile(null);
      document.querySelector('input[type="file"]').value = '';

    } catch (error) {
      console.error("❌ Error adding alumni:", error);
      alert(`Failed to add alumni: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Panel - Add Alumni</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Batch</label>
            <input type="text" name="batch" value={formData.batch} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Industry</label>
            <input type="text" name="industry" value={formData.industry} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>

          {/* ✅ Added Location Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            <input type="file" name="photo" onChange={handlePhotoChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            <p className="mt-1 text-sm text-gray-500">Max file size: 5MB</p>
          </div>

          <button type="submit" disabled={isLoading} className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>
            {isLoading ? "Adding Alumni..." : "Add Alumni"}
          </button>

        </form>
      </div>
    </div>
  );
}
