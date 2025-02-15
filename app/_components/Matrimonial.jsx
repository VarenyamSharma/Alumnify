import { Button } from "@/components/ui/button";
import React from "react";

const Matrimonial = () => {
  return (
    <section className="py-16 bg-blue-600 text-center">
      <h2 className="text-3xl font-bold text-white">Ready To Connect?</h2>
      <p className="mt-4 text-lg font-semibold text-blue-200">
        Join thousands of studentss and alumini already building their <br/> 
        Profesioal future through our netwrork.
      </p>
      <Button className="bg-white text-blue-700 font-semibold hover:bg-blue-100 mt-6">
        Sign Up Now
        </Button>
    </section>
  );
};

export default Matrimonial;
