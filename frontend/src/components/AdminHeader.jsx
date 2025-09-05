import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiTruck,
  FiCalendar,
  FiHome,
} from "react-icons/fi";
import {Link} from "react-router-dom"

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Drivers");

  const navItems = [
    { name: "Users", icon: <FiHome className="mr-1" />, link: "/allUsers" },
    {
      name: "Drivers",
      icon: <FiTruck className="mr-1" />,
      link: "/allDrivers",
    },
    {
      name: "Bookings",
      icon: <FiCalendar className="mr-1" />,
      link: "/allBookings",
    },
    { name: "Queries", icon: <FiLogOut className="mr-1" />, link: "/queries" },
    { name: "Logout", icon: <FiLogOut className="mr-1" />, link: "/login" },
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <div className="bg-white p-2 rounded-lg mr-2">
              <FiTruck className="h-6 w-6 text-indigo-600" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold">DriveEase Admin</h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveLink(item.name)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all`}
              >
                <Link to={item.link} className="flex justify-center items-center gap-1">
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </motion.button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 md:hidden bg-white bg-opacity-10 backdrop-blur-lg rounded-lg overflow-hidden"
            >
              <div className="py-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onClick={() => {
                      setActiveLink(item.name);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                      activeLink === item.name
                        ? "bg-white text-indigo-600"
                        : "text-white hover:bg-white hover:bg-opacity-10"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default AdminHeader;
