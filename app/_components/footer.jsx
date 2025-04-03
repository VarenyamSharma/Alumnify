import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Instagram, Facebook } from "lucide-react"; // Import social icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-10">
        
        {/* Left Section: Logo & Description */}
        <div className="max-w-sm">
          <h1 className="text-2xl font-bold text-blue-500 flex items-center gap-2">
            🎓 Alumnify
          </h1>
          <p className="mt-2 text-gray-400">
            Connecting students with alumni for better career opportunities.
          </p>
        </div>

        {/* Middle Section: Quick Links & Support */}
        <div className="flex gap-16">
          <div>
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              {["Home", "Find Alumni", "Resources", "About Us"].map((link) => (
                <li key={link}>
                  <Link href="/" className="hover:text-gray-100">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="mt-3 space-y-2">
              {["Help Center", "Terms of Service", "Privacy Policy", "Contact Us"].map((link) => (
                <li key={link}>
                  <Link href="/" className="hover:text-gray-100">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section: Social Icons */}
        <div>
          <h4 className="text-lg font-semibold text-white">Follow Us</h4>
          <div className="flex gap-4 mt-3">
            {[Twitter, Linkedin, Instagram, Facebook].map((Icon, index) => (
              <Link href="/" key={index} className="hover:text-gray-100">
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-700 my-6 mx-6" />

      {/* Copyright */}
      <p className="text-center text-gray-400 text-sm">© 2025 Alumnify. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
