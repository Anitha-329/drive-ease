import React, { useState } from "react";
import {
  FaCar,
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaBook,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const DriverHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
    // Typically would clear localStorage and redirect to login
    localStorage.removeItem("driver");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Company Logo and Name */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <FaCar className="text-blue-600 text-2xl md:text-3xl" />
            <span className="text-xl md:text-2xl font-bold text-blue-800">
              DriveEase
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/driver/profile"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 flex items-center"
          >
            <FaTachometerAlt className="mr-1" />
            Dashboard
          </Link>
          <Link
            to="/driver/bookings"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 flex items-center"
          >
            <FaBook className="mr-1" />
            Bookings
          </Link>
          <button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
          >
            <FaSignOutAlt className="mr-1" />
            Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white mt-4 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="px-4 py-3 space-y-3">
              <Link
                to="/driver/profile"
                className=" py-2 px-4 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors duration-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaTachometerAlt className="mr-3" />
                Dashboard
              </Link>
              <Link
                to="/driver/bookings"
                className=" py-2 px-4 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors duration-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaBook className="mr-3" />
                Bookings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 flex items-center"
              >
                <FaSignOutAlt className="mr-3" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DriverHeader;
