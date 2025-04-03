"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router

const Matrimonial = () => {
  const { isSignedIn } = useUser(); // Check if user is signed in
  const router = useRouter();

  return (
    <section className="py-16 bg-blue-600 text-center">
      <h2 className="text-3xl font-bold text-white">Ready To Connect?</h2>
      <p className="mt-4 text-lg font-semibold text-blue-200">
        Join thousands of students and alumni already building their <br />
        Professional future through our network.
      </p>

      {/* Show "Sign Up Now" only if the user is NOT signed in */}
      {!isSignedIn && (
        <Button 
          className="bg-white text-blue-700 font-semibold hover:bg-blue-100 mt-6"
          onClick={() => router.push('/sign-up')} // ✅ Redirect to sign-in page
        >
          Sign Up Now
        </Button>
      )}
    </section>
  );
};

export default Matrimonial;
