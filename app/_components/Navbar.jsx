"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';
import { GraduationCap, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { isSignedIn } = useUser(); // Clerk authentication state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUnauthorizedClick = (event) => {
    if (!isSignedIn) {
      event.preventDefault();
      alert("You need to sign in to access this page.");
    }
  };

  return (
    <header className="w-full border-b shadow-sm">
      <nav className="flex justify-between items-center px-6 md:px-20 py-4 relative">
        <Link href="/" className="flex items-center gap-1">
          <GraduationCap size={30} />
          <p className="font-spaceGrotesk text-[21px] text-blue-600 font-bold">Alumnify</p>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-gray-600">
          {['/', '/findAlumni', '/About', '/events', '/Profile'].map((path, index) => (
            <li key={index}>
              <Link 
                href={path}
                className={!isSignedIn ? "pointer-events-none opacity-50" : ""}
                onClick={handleUnauthorizedClick}
              >
                {path === '/' ? 'Home' : path.replace('/', '')}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex gap-4">
          {isSignedIn ? (
            <UserButton />
          ) : (
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

        {/* Mobile Menu Button */}
        <button className="md:hidden z-[-1]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center py-4 gap-4">
            {['/', '/find Alumni', '/About', '/events', '/Profile'].map((path, index) => (
              <Link 
                key={index} 
                href={path} 
                className={!isSignedIn ? "pointer-events-none opacity-50" : ""} 
                onClick={handleUnauthorizedClick}
              >
                {path === '/' ? 'Home' : path.replace('/', '')}
              </Link>
            ))}
            <div className="flex flex-col gap-2">
              {isSignedIn ? (
                <UserButton />
              ) : (
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
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
