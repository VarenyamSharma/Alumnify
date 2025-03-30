"use client";

import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import alumniData from "../../data/alumni.json"; // Ensure this file exists

const Profile = () => {
  const { user } = useUser();
  const [departmentPreference, setDepartmentPreference] = useState("");
  const [rolePreference, setRolePreference] = useState("");
  const [matchedProfiles, setMatchedProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 4;

  const fetchMatchedProfiles = () => {
    if (!user) return toast.error("User not found");

    const trimmedRole = rolePreference.trim().toLowerCase();
    const trimmedDept = departmentPreference.trim().toLowerCase();

    if (!trimmedRole || !trimmedDept) {
      return toast.error("Please enter both department and job profile preferences.");
    }

    const filteredProfiles = alumniData.filter(alumni =>
      alumni["job profile"]?.toLowerCase().includes(trimmedRole) &&
      alumni["department"]?.toLowerCase().includes(trimmedDept)
    );

    setMatchedProfiles(filteredProfiles);
    setCurrentPage(1); // Reset pagination when new results are found
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
    fetchMatchedProfiles();
  };

  // Pagination Logic
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = matchedProfiles.slice(indexOfFirstProfile, indexOfLastProfile);
  const totalPages = Math.ceil(matchedProfiles.length / profilesPerPage) || 1;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        <img src={user?.imageUrl} alt="Profile" className="w-16 h-16 rounded-full" />
        <h2 className="text-xl font-semibold">{user?.fullName}</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
            Department Preference
          </label>
          <Input
            id="department"
            type="text"
            placeholder="e.g. Computer Science, Finance, Marketing"
            value={departmentPreference}
            onChange={(e) => setDepartmentPreference(e.target.value)}
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

      {matchedProfiles.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mt-6">Matched Profiles</h3>
          <div className="mt-4 grid grid-cols-1 gap-4">
            {currentProfiles.map((alumni) => (
              <Card key={alumni.id} className="p-4">
                <CardContent className="flex items-center space-x-4">
                  <img src={alumni.photo} alt={alumni.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-semibold">{alumni.name}</p>
                    <p className="text-sm text-gray-600">{alumni["job profile"]} at {alumni.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
