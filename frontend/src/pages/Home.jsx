import React from "react";
import { motion } from "framer-motion";
import {
  FaCar,
  FaUserShield,
  FaWallet,
  FaBell,
  FaQuestionCircle,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { FiClock, FiCheckCircle, FiUsers, FiShield } from "react-icons/fi";
import { RiCustomerService2Fill } from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20 px-4 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-between"
          >
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Premium Ride-Sharing{" "}
                <span className="text-yellow-300">Service</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Book reliable rides with professional drivers. Safe,
                comfortable, and affordable transportation at your fingertips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Link
                    className="flex justify-center items-center gap-2"
                    to="/login"
                  >
                    <FaSignInAlt /> Login
                  </Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent hover:bg-blue-700 text-white font-bold py-3 px-6 border-2 border-white rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <FaUserPlus /> Register
                </motion.button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <motion.img
                src="https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Premium car"
                className="rounded-xl shadow-2xl w-full max-w-md"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-10 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting a ride has never been easier. Just follow these simple
              steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaCar className="text-4xl text-blue-600" />,
                title: "Book a Ride",
                description:
                  "Select your destination and preferred vehicle type. Schedule now or for later.",
              },
              {
                icon: <FiClock className="text-4xl text-blue-600" />,
                title: "Meet Your Driver",
                description:
                  "Track your driver in real-time. Get notified when they arrive.",
              },
              {
                icon: <FaWallet className="text-4xl text-blue-600" />,
                title: "Enjoy Your Ride",
                description:
                  "Pay securely through the app. Rate your experience after the trip.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-6">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the best ride-sharing experience with premium features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaUserShield className="text-3xl text-blue-600" />,
                title: "Verified Drivers",
                description:
                  "All drivers undergo rigorous background checks for your safety.",
              },
              {
                icon: <FiCheckCircle className="text-3xl text-blue-600" />,
                title: "Reliable Service",
                description:
                  "On-time pickups with professional, courteous drivers.",
              },
              {
                icon: <FiShield className="text-3xl text-blue-600" />,
                title: "Safe Rides",
                description:
                  "24/7 support and real-time tracking for peace of mind.",
              },
              {
                icon: <FiUsers className="text-3xl text-blue-600" />,
                title: "Multiple Options",
                description:
                  "Choose from economy, premium, or luxury vehicles.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="mt-1">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-10 lg:px-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to experience premium rides?
              </h2>
              <p className="text-xl text-blue-100">
                Join thousands of satisfied customers who trust us for their
                transportation needs.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition-all"
            >
              Get Started <BsArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-10 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from people who have used our service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The best ride-sharing service I've used. Always on time and the drivers are professional.",
                name: "Sarah Johnson",
                role: "Frequent User",
              },
              {
                quote:
                  "As a driver, the platform is fair and I earn good money with flexible hours.",
                name: "Michael Chen",
                role: "Driver Partner",
              },
              {
                quote:
                  "Perfect for business trips. The premium vehicles are always clean and comfortable.",
                name: "David Wilson",
                role: "Business Traveler",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                <p className="text-gray-600 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row gap-12"
          >
           
            <div className="md:w-2/3">
              {[
                {
                  question: "How do I book a ride?",
                  answer:
                    "Simply download our app, enter your destination, select your vehicle type, and confirm your booking. You can schedule rides in advance or book for immediate pickup.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit/debit cards, digital wallets, and our secure in-app payment system through Razorpay for seamless transactions.",
                },
                {
                  question: "How are drivers vetted?",
                  answer:
                    "All drivers undergo thorough background checks, vehicle inspections, and must complete our safety training program before being approved on the platform.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="mb-6 border-b pb-6"
                >
                  <h3 className="text-xl font-bold mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 md:px-10 lg:px-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Ride-Sharing Community Today
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Whether you need rides or want to earn as a driver, we have
              opportunities for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <Link
                  to="/login"
                  className="flex justify-center items-center gap-2"
                >
                  <FaUserPlus /> Sign Up as Rider
                </Link>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <Link
                  to="/login"
                  className="flex justify-center items-center gap-2"
                >
                  <FaCar /> Become a Driver
                </Link>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">RideShare Pro</h3>
            <p className="text-gray-400">
              Premium ride-sharing service for modern transportation needs.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Safety
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Community Guidelines
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Licenses
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} RideShare Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
