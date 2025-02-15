import React from "react";
import { Users, Compass, Handshake } from "lucide-react"; // Importing icons

const FeaturesSection = () => {
  const features = [
    {
      icon: <Users size={40} className="text-blue-600" />,
      title: "Find Alumni",
      description: "Connect with graduates from your field and build your professional network."
    },
    {
      icon: <Compass size={40} className="text-blue-600" />,
      title: "Career Guidance",
      description: "Get personalized career advice from professionals in your desired industry."
    },
    {
      icon: <Handshake size={40} className="text-blue-600" />,
      title: "Networking Events",
      description: "Participate in exclusive events and workshops with industry leaders."
    }
  ];

  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-gray-900">Why Join Our Network?</h2>
      
      {/* Feature Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center space-y-4">
            <div className="bg-blue-100 p-4 rounded-full">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 max-w-xs">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
