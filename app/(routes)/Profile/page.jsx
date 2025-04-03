//<<<<<<< Tabnine <<<<<<<
"use client";

import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// import { useAuth } from '@clerk/nextjs';

// const Profile = () => {
//   //   const { getToken } = useAuth();
//   // const token = await getToken();

//   const { user } = useUser();
//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     department: "",
//     role: "",
//     company: "",
//     phone: "",
//     location: "",
//     bio: "",
//     skills: "",
//     experience: "",
//   });
//   const [formErrors, setFormErrors] = useState({});

//   useEffect(() => {
//     fetchUserProfile();
//   }, [user]);

//   const fetchUserProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("/api/alumni/profile");

//       if (response.data.success) {
//         setUserProfile(response.data.data);
//         // Initialize form data with existing profile
//         setFormData({
//           department: response.data.data.department || "",
//           role: response.data.data.role || "",
//           company: response.data.data.company || "",
//           phone: response.data.data.phone || "",
//           location: response.data.data.location || "",
//           bio: response.data.data.bio || "",
//           skills: response.data.data.skills || "",
//           experience: response.data.data.experience || "",
//         });
//       } else {
//         toast.error("Failed to fetch profile");
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//       toast.error("Failed to fetch profile");
//     } finally {
//       setLoading(false);
//     }
//   };

const Profile = () => {
  const { user } = useUser();
  const { getToken } = useAuth(); // Destructure getToken from useAuth
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    department: "",
    role: "",
    company: "",
    phone: "",
    location: "",
    bio: "",
    skills: "",
    experience: ""
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);


      const token = await getToken();
      console.log("Token:", token);//+ // Get the token
      const response = await axios.get('/api/alumni/profile', {
        headers: {
          Authorization: `Bearer ${token}` // Use the token in the request
        }
      });

      if (response.data.success) {
        setUserProfile(response.data.data);
        // Initialize form data with existing profile
        setFormData({
          department: response.data.data.department || "",
          role: response.data.data.role || "",
          company: response.data.data.company || "",
          phone: response.data.data.phone || "",
          location: response.data.data.location || "",
          bio: response.data.data.bio || "",
          skills: response.data.data.skills || "",
          experience: response.data.data.experience || ""
        });
      } else {
        toast.error("Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.department.trim())
      errors.department = "Department is required";
    if (!formData.role.trim()) errors.role = "Role is required";
    if (!formData.company.trim()) errors.company = "Company is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.location.trim()) errors.location = "Location is required";
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await axios.put("/api/alumni/profile", formData);

      if (response.data.success) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        fetchUserProfile(); // Refresh the profile data
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const isProfileEmpty =
    userProfile &&
    !userProfile.department &&
    !userProfile.role &&
    !userProfile.company &&
    !userProfile.phone &&
    !userProfile.location;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src={user?.imageUrl || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-200"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user?.fullName}</h2>
            <p className="text-gray-600">
              {user?.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>

        {userProfile && (
          <Card className="w-full">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Profile Information</h3>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    {isProfileEmpty ? "Complete Your Profile" : "Edit Profile"}
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Save Changes</Button>
                  </div>
                )}
              </div>

              {isProfileEmpty && !isEditing && (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-4">
                    Your profile is incomplete. Please add your information to
                    make it visible to other alumni.
                  </p>
                  <Button onClick={() => setIsEditing(true)}>
                    Complete Your Profile
                  </Button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="department">Department *</Label>
                      {isEditing ? (
                        <div>
                          <Input
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            placeholder="Enter your department"
                            className={
                              formErrors.department ? "border-red-500" : ""
                            }
                          />
                          {formErrors.department && (
                            <p className="text-sm text-red-500 mt-1">
                              {formErrors.department}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="font-medium">
                          {userProfile.department || "Not specified"}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="role">Role *</Label>
                      {isEditing ? (
                        <div>
                          <Input
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            placeholder="Enter your role"
                            className={formErrors.role ? "border-red-500" : ""}
                          />
                          {formErrors.role && (
                            <p className="text-sm text-red-500 mt-1">
                              {formErrors.role}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="font-medium">
                          {userProfile.role || "Not specified"}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="company">Company *</Label>
                      {isEditing ? (
                        <div>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Enter your company"
                            className={
                              formErrors.company ? "border-red-500" : ""
                            }
                          />
                          {formErrors.company && (
                            <p className="text-sm text-red-500 mt-1">
                              {formErrors.company}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="font-medium">
                          {userProfile.company || "Not specified"}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      {isEditing ? (
                        <div>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className={formErrors.phone ? "border-red-500" : ""}
                          />
                          {formErrors.phone && (
                            <p className="text-sm text-red-500 mt-1">
                              {formErrors.phone}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="font-medium">
                          {userProfile.phone || "Not specified"}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      {isEditing ? (
                        <div>
                          <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Enter your location"
                            className={
                              formErrors.location ? "border-red-500" : ""
                            }
                          />
                          {formErrors.location && (
                            <p className="text-sm text-red-500 mt-1">
                              {formErrors.location}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="font-medium">
                          {userProfile.location || "Not specified"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself"
                        className="min-h-[100px]"
                      />
                    ) : (
                      <p className="font-medium whitespace-pre-wrap">
                        {userProfile.bio || "Not specified"}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="skills">Skills</Label>
                    {isEditing ? (
                      <Textarea
                        id="skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        placeholder="List your skills (comma-separated)"
                        className="min-h-[100px]"
                      />
                    ) : (
                      <p className="font-medium whitespace-pre-wrap">
                        {userProfile.skills || "Not specified"}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience</Label>
                    {isEditing ? (
                      <Textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="Describe your work experience"
                        className="min-h-[100px]"
                      />
                    ) : (
                      <p className="font-medium whitespace-pre-wrap">
                        {userProfile.experience || "Not specified"}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;
//>>>>>>> Tabnine >>>>>>>// {"source":"chat"}
