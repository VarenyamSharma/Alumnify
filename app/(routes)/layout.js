import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../_components/Navbar";

export default function Layout({ children }) {
    return (
      <ClerkProvider>
      <div className="min-h-screen flex flex-col">
        {/* Header Section */}
        <Navbar />
  
        {/* Main Content Section */}
        <main className="flex-grow container mx-auto p-6">{children}</main>
  
        {/* Footer Section */}
        <footer className="p-4 bg-gray-800 text-white text-center">
          <p>&copy; {new Date().getFullYear()} Alumnify. All rights reserved.</p>
        </footer>
      </div>
    </ClerkProvider>
    );
  }
  