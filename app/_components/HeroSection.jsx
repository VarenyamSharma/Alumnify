import { Button } from '@/components/ui/button';
import React from 'react';
import Image from 'next/image';

const HeroSection = () => {
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
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg">
            Sign Up Now
          </Button>
          <Button variant="outline" className="border-white text-black hover:bg-white hover:text-blue-700 px-6 py-3 text-lg">
            Find Alumni
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
