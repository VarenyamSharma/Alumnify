"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function AdminPanel() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    batch: "",
    company: "",
    role: "",
    industry: "",
    location: "",
    bio: "",
    linkedIn: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState(null);

  // Debug info for auth
  useEffect(() => {
    if (isLoaded) {
      setDebugInfo({
        isSignedIn,
        userId: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.emailAddresses?.[0]?.emailAddress
      });
    }
  }, [isLoaded, isSignedIn, user]);

  // Check authentication
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect("/sign-in");
    }
  }, [isLoaded, isSignedIn]);

  // Pre-fill email with user's email if available
  useEffect(() => {
    if (user?.emailAddresses?.length > 0) {
      setFormData(prev => ({
        ...prev,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: user.emailAddresses[0].emailAddress
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setError("File is too large. Please choose a file under 5MB");
      e.target.value = '';
      return;
    }
    setPhotoFile(file);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      if (!isSignedIn) {
        throw new Error("You must be signed in to add an alumni");
      }
      
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (photoFile) {
        formDataToSend.append("photo", photoFile);
      }

      console.log("📤 Sending request to: /api/admin/alumni");
      console.log("📦 Form data keys:", [...formDataToSend.keys()]);
      
      // Use native fetch for simpler request handling
      const response = await fetch("/api/admin/alumni", {
        method: "POST",
        body: formDataToSend,
      });
      
      // Log the raw response for debugging
      console.log("🔍 Response status:", response.status);
      
      const data = await response.json();
      console.log("✅ Response data:", data);

      if (!data.success) {
        throw new Error(data.error || "Failed to add alumni");
      }

      alert("🎉 Alumni added successfully!");
      setFormData({ 
        name: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : "", 
        email: user?.emailAddresses?.[0]?.emailAddress || "", 
        batch: "", 
        company: "", 
        role: "", 
        industry: "", 
        location: "",
        bio: "",
        linkedIn: "" 
      });
      setPhotoFile(null);
      document.querySelector('input[type="file"]').value = '';

    } catch (error) {
      console.error("❌ Error adding alumni:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading or redirect if not authenticated
  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-6 bg-red-50 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-red-700">Authentication Required</h2>
        <p className="mb-4">You need to be signed in to access the admin panel.</p>
        <button 
          onClick={() => redirect("/sign-in")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Panel - Add Alumni</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {debugInfo && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded text-xs">
            <p className="font-semibold">Auth Debug Info:</p>
            <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bio (Optional)</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn (Optional)</label>
            <input type="url" name="linkedIn" value={formData.linkedIn} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
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
