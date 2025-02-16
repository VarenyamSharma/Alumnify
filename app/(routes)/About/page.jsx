"use client";

import { Settings, Shuffle, Handshake } from "lucide-react";
import React from "react";

const About = () => {
  return (
    <div className="p-8   text-gray-800 w-full">
      

      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-3xl font-bold text-blue-600 mb-4">About Alumnify</h1>
        
        <section className="mb-6 ">
          <h2 className="text-xl font-semibold mb-2">What We Do</h2>
          <p className="text-gray-700">
            Alumnify is a platform designed to bridge the gap between students
            and alumni, enabling meaningful connections for career guidance,
            mentorship, and professional networking. We empower students by
            providing access to experienced alumni from their own college who
            have excelled in various industries.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">How We Do It</h2>
          <p className="text-gray-700">
            We simplify the process of finding and connecting with alumni
            through a streamlined matching system based on key preferences such
            as industry, role, and batch year. Students can explore alumni
            profiles, learn about their career journeys, and seek valuable
            insights for their own professional growth.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Why It Matters</h2>
          <p className="text-gray-700">
            Building strong alumni-student connections fosters a culture of
            mentorship and guidance, helping students make informed career
            decisions. Alumnify creates opportunities for networking, career
            advice, and real-world exposure that can shape a student’s future.
          </p>
        </section>
      </div>

      {/* How Matching Works Section */}
      <div className="mt-12 p-8 bg-gray-100 ">
        <h2 className="text-2xl font-semibold text-center mb-8">
          How Matching Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <Settings className="text-blue-600 w-10 h-10" />
            </div>
            <h3 className="font-semibold text-lg mt-3">Profile Analysis</h3>
            <p className="text-gray-600 mt-1">
              We analyze your profile, interests, and career goals.
            </p>
          </div>

          
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <Shuffle className="text-blue-600 w-10 h-10" />
            </div>
            <h3 className="font-semibold text-lg mt-3">Smart Matching</h3>
            <p className="text-gray-600 mt-1">
              Our algorithm finds alumni with similar career paths.
            </p>
          </div>

          
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <Handshake className="text-blue-600 w-10 h-10" />
            </div>
            <h3 className="font-semibold text-lg mt-3">Connection</h3>
            <p className="text-gray-600 mt-1">
              Connect with alumni who can help guide your career.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
