import Image from "next/image";
import Navbar from "./_components/Navbar";
import HeroSection from "./_components/HeroSection";
import Features from "./_components/features";
import Matrimonial from "./_components/Matrimonial";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features/>
      <Matrimonial/>
      <Footer/>
    </div>
  );
}
