import React from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaFileContract,
  FaShieldAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            to="/signup"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" />
            <span>Go Back</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FaFileContract className="mr-3 text-blue-600" />
            Terms of Service
          </h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="p-8">
            <div className="mb-8 border-b pb-6">
              <p className="text-gray-600 mb-4">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-lg text-gray-700">
                Welcome to RideShare Pro! These Terms of Service govern your use
                of our platform and services.
              </p>
            </div>

            <div className="space-y-10">
              {/* Section 1 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaShieldAlt className="mr-3 text-blue-500" />
                  1. Acceptance of Terms
                </h2>
                <div className="pl-10 space-y-4 text-gray-700">
                  <p>
                    By accessing or using the RideShare Pro platform, you agree
                    to be bound by these Terms of Service and our Privacy
                    Policy. If you do not agree to these terms, please do not
                    use our services.
                  </p>
                  <p>
                    We reserve the right to modify these terms at any time. Your
                    continued use of the platform after such modifications
                    constitutes your acceptance of the new terms.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  2. User Responsibilities
                </h2>
                <div className="pl-10 space-y-4 text-gray-700">
                  <p>As a user of RideShare Pro, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Provide accurate and complete information when creating
                      your account
                    </li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Use the service only for lawful purposes</li>
                    <li>Not engage in any fraudulent or harmful activities</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaExclamationTriangle className="mr-3 text-yellow-500" />
                  3. Prohibited Conduct
                </h2>
                <div className="pl-10 space-y-4 text-gray-700">
                  <p>You may not use RideShare Pro to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Harass, threaten, or intimidate other users</li>
                    <li>
                      Post or transmit any unlawful, harmful, or offensive
                      content
                    </li>
                    <li>
                      Attempt to gain unauthorized access to any accounts or
                      systems
                    </li>
                    <li>
                      Interfere with the proper functioning of the platform
                    </li>
                    <li>
                      Use the service for any commercial purposes without our
                      express permission
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  4. Payment and Fees
                </h2>
                <div className="pl-10 space-y-4 text-gray-700">
                  <p>
                    RideShare Pro charges fees for certain services. All fees
                    are clearly displayed before you use a paid service. You
                    agree to pay all applicable fees and taxes.
                  </p>
                  <p>
                    We use secure payment processors (including Razorpay) to
                    handle transactions. We do not store your full payment card
                    information on our servers.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  5. Termination
                </h2>
                <div className="pl-10 space-y-4 text-gray-700">
                  <p>
                    We may terminate or suspend your account immediately,
                    without prior notice or liability, for any reason
                    whatsoever, including without limitation if you breach these
                    Terms.
                  </p>
                  <p>
                    Upon termination, your right to use the service will
                    immediately cease. If you wish to terminate your account,
                    you may simply discontinue using the service.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  6. Limitation of Liability
                </h2>
                <div className="pl-10 space-y-4 text-gray-700">
                  <p>
                    In no event shall RideShare Pro, nor its directors,
                    employees, partners, agents, suppliers, or affiliates, be
                    liable for any indirect, incidental, special, consequential
                    or punitive damages, including without limitation, loss of
                    profits, data, use, goodwill, or other intangible losses.
                  </p>
                  <p>
                    Our maximum liability to you for any claim related to the
                    service shall not exceed the amount you paid us in the last
                    12 months.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Contact Us
                </h3>
                <p className="text-gray-700">
                  If you have any questions about these Terms of Service, please
                  contact us at:
                </p>
                <p className="text-blue-600 mt-2">legal@ridesharepro.com</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default TermsOfService;
