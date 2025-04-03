"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';
import { GraduationCap, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Navbar = () => {
  const { isSignedIn } = useUser(); // Clerk authentication state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full border-b shadow-sm">
      <nav className="flex justify-between items-center px-6 md:px-20 py-4">
        <Link href="/" className="flex items-center gap-1">
          <GraduationCap size={30} />
          <p className="font-spaceGrotesk text-[21px] text-blue-600 font-bold">Alumnify</p>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-gray-600  md:text-semibold">
          {['/', '/findAlumni', '/About', '/events', '/Profile'].map((path, index) => (
            isSignedIn ? (
              <li key={index}>
                <Link href={path}>{path === '/' ? 'Home' : path.replace('/', '')}</Link>
              </li>
            ) : null
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

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden">
              <Menu size={30} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col items-center py-6 gap-4">
            <SheetHeader>
              <SheetTitle className="text-2xl text-blue-600 font-bold">Alumnify</SheetTitle>
              {/* <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </SheetDescription> */}
            </SheetHeader>
            {['/', '/findAlumni', '/About', '/events', '/Profile'].map((path, index) => (
              isSignedIn ? (
                <Link key={index} href={path} onClick={() => setIsMenuOpen(false)}>
                  {path === '/' ? 'Home' : path.replace('/', '')}
                </Link>
              ) : null
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
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;
