import React from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaLock,
  FaUserShield,
  FaDatabase,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FaLock className="mr-3 text-blue-600" />
            Privacy Policy
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
                Effective Date:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-lg text-gray-700">
                At RideShare Pro, we are committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you use our platform.
              </p>
            </div>

            <div className="space-y-10">
              {/* Section 1 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaDatabase className="mr-3 text-blue-500" />
                  1. Information We Collect
                </h2>
                <div className="pl-10 space-y-4 text-gray-700">
                  <p>
                    We collect several types of information from and about users
                    of our platform, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Personal Information:</strong> Name, email
                      address, phone number, payment information, and other
                      contact details
                    </li>
                    <li>
                      <strong>Usage Data:</strong> Information about how you
                      interact with our platform, including IP addresses, device
                      information, and browsing behavior
                    </li>
                    <li>
                      <strong>Location Data:</strong> Precise or approximate
                      location information for ride matching and safety purposes
                    </li>
                    <li>
                      <strong>User Content:</strong> Any communications,
                      feedback, or other content you submit to the platform
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  2. How We Use Your Information
                </h2>
                <div className="pl-10 space-y-4 text-gray-700">
                  <p>
                    We use the information we collect for various purposes,
                    including to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, operate, and maintain our services</li>
                    <li>Improve, personalize, and expand our services</li>
                    <li>Process transactions and send related information</li>
                    <li>
                      Communicate with you, including for customer service and
                      updates
                    </li>
                    <li>Ensure safety and security of our platform</li>
                    <li>Comply with legal obligations and prevent fraud</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaUserShield className="mr-3 text-blue-500" />
                  3. Data Sharing and Disclosure
                </h2>
                <div className="pl-10 space-y-4 text-gray-700">
                  <p>
                    We may share your information in the following situations:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>With Service Providers:</strong> We may share
                      information with third-party vendors who perform services
                      for us (payment processors, analytics, etc.)
                    </li>
                    <li>
                      <strong>For Legal Reasons:</strong> If required by law or
                      to protect our rights and safety
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> In connection with
                      any merger, sale of company assets, or acquisition
                    </li>
                    <li>
                      <strong>With Your Consent:</strong> For any other purpose
                      disclosed by us when you provide the information
                    </li>
                  </ul>
                  <p>
                    We do not sell your personal information to third parties.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  4. Data Security
                </h2>
                <div className="pl-10 space-y-4 text-gray-700">
                  <p>
                    We implement appropriate technical and organizational
                    measures to protect your personal information. These
                    include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encryption of sensitive data in transit and at rest</li>
                    <li>Regular security assessments and testing</li>
                    <li>Access controls and authentication measures</li>
                    <li>Employee training on data protection</li>
                  </ul>
                  <p>
                    However, no method of transmission over the Internet or
                    electronic storage is 100% secure, and we cannot guarantee
                    absolute security.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  5. Your Rights and Choices
                </h2>
                <div className="pl-10 space-y-4 text-gray-700">
                  <p>
                    Depending on your location, you may have certain rights
                    regarding your personal information, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      The right to access and receive a copy of your personal
                      data
                    </li>
                    <li>
                      The right to request correction of inaccurate information
                    </li>
                    <li>The right to request deletion of your personal data</li>
                    <li>
                      The right to object to or restrict certain processing
                    </li>
                    <li>The right to data portability</li>
                  </ul>
                  <p>
                    To exercise these rights, please contact us using the
                    information below.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  6. Changes to This Policy
                </h2>
                <div className="pl-10 space-y-4 text-gray-700">
                  <p>
                    We may update our Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "Effective Date" at the top.
                  </p>
                  <p>
                    You are advised to review this Privacy Policy periodically
                    for any changes. Changes to this Privacy Policy are
                    effective when they are posted on this page.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Contact Us
                </h3>
                <p className="text-gray-700">
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                </p>
                <div className="mt-2 flex items-center text-blue-600">
                  <FaEnvelope className="mr-2" />
                  privacy@ridesharepro.com
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
