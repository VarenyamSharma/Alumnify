"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

const Profile = () => {
  const { user } = useUser();
  const [industryPreference, setIndustryPreference] = useState("");
  const [rolePreference, setRolePreference] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`/api/admin/student/${user.id}`);
        setIndustryPreference(response.data.industryPreference || "");
        setRolePreference(response.data.rolePreference || "");
      } catch (error) {
        toast.error("Error fetching profile data");
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("User not found");

    try {
      await axios.put(`/api/admin/student/${user.id}`, {
        userId: user.id,
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        industryPreference,
        rolePreference
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        <img src={user?.imageUrl} alt="Profile" className="w-16 h-16 rounded-full" />
        <h2 className="text-xl font-semibold">{user?.fullName}</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
            Industry Preference
          </label>
          <Input
            id="industry"
            type="text"
            placeholder="e.g. Technology, Healthcare, Finance"
            value={industryPreference}
            onChange={(e) => setIndustryPreference(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role Preference
          </label>
          <Input
            id="role"
            type="text"
            placeholder="e.g. Software Engineer, Data Analyst"
            value={rolePreference}
            onChange={(e) => setRolePreference(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">Save Profile</Button>
      </form>
    </div>
  );
};

export default Profile;