"use client"

import Link from 'next/link';
import React from 'react';
import { useUser, UserButton } from '@clerk/nextjs';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { isSignedIn } = useUser(); // Clerk authentication state

  const handleUnauthorizedClick = (event) => {
    if (!isSignedIn) {
      event.preventDefault();
      alert("You need to sign in to access this page.");
    }
  };

  return (
    <header className="w-full">
      <nav className="flex justify-between items-center px-6 md:px-20 py-4">
        <Link href="/" className="flex items-center gap-1">
          <GraduationCap size={30} />
          <p className="font-spaceGrotesk text-[21px] text-blue-600 font-bold">
            AlumniConnect
          </p>
        </Link>

        {/* Navigation Links - Visible but restricted */}
        <ul className="flex gap-6 text-gray-600">
          <li>
            <Link 
              href="/home"
              className={!isSignedIn ? "pointer-events-none opacity-50" : ""}
              onClick={handleUnauthorizedClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/findAlumni"
              className={!isSignedIn ? "pointer-events-none opacity-50" : ""}
              onClick={handleUnauthorizedClick}
            >
              Find Alumni
            </Link>
          </li>
          <li>
            <Link 
              href="/about"
              className={!isSignedIn ? "pointer-events-none opacity-50" : ""}
              onClick={handleUnauthorizedClick}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              href="/resources"
              className={!isSignedIn ? "pointer-events-none opacity-50" : ""}
              onClick={handleUnauthorizedClick}
            >
              Resources
            </Link>
          </li>
        </ul>

        <div className="flex gap-4">
          {/* If signed in, show Clerk's UserButton */}
          {isSignedIn ? (
            <UserButton />
          ) : (
            // Show Sign In and Sign Up buttons if not signed in
            <>
              <Button variant="secondary">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button className="bg-blue-600 text-white">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
