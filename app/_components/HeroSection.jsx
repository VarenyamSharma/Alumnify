"use client";

import { Button } from '@/components/ui/button';
import React from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'; // ✅ Correct import for App Router

const HeroSection = () => {
  const { user, isSignedIn } = useUser(); 
  const router = useRouter(); // ✅ Using correct Next.js router

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
       {/* Background Image */}
       <div className="absolute inset-0">
        <Image 
          src="/assets/hero image.jpg" 
          alt="Hero Background" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl w-full px-8 text-white text-left">
        <h1 className="text-5xl font-bold leading-tight">
          Connect with Alumni Who <br /> Shape the Future
        </h1>
        <p className="mt-4 text-lg">
          Build meaningful connections with graduates who've walked your path 
          and are ready to guide your journey.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          {isSignedIn ? (
            <Button 
              variant="outline" 
              className="border-white text-black hover:bg-white hover:text-blue-700 px-6 py-3 text-lg"
              onClick={() => router.push('/findAlumni')} // ✅ Navigating correctly
            >
              Find Alumni
            </Button>
          ) : (
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg"
              onClick={() => router.push('/sign-in')} // ✅ Navigating correctly
            >
              Sign Up Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
