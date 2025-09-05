import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiXCircle,
  FiUser,
  FiMail,
  FiCreditCard,
  FiClock,
  FiAlertCircle,
  FiX,
  FiEye,
  FiFile,
  FiDownload,
} from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";
import AdminHeader from "../../components/AdminHeader";
import { FaCar } from "react-icons/fa";

const AllDrivers = () => {
  const [allDrivers, setAllDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getALLDrivers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://my-mern-api-env.eba-yh8jahid.us-east-1.elasticbeanstalk.com/driver/getALLDriver"
      );
      setAllDrivers(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch drivers data");
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (driverId, verifyStatus) => {
    try {
      await axios.post(
        `https://my-mern-api-env.eba-yh8jahid.us-east-1.elasticbeanstalk.com/driver/verify`,
        {
          id: driverId,
          verification: verifyStatus,
        }
      );

      setAllDrivers((prevDrivers) =>
        prevDrivers.map((driver) =>
          driver._id === driverId
            ? { ...driver, verfied: verifyStatus }
            : driver
        )
      );

      if (selectedDriver && selectedDriver._id === driverId) {
        setSelectedDriver({ ...selectedDriver, verfied: verifyStatus });
      }

      toast.success(
        `Driver ${verifyStatus ? "verified" : "unverified"} successfully`
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to update verification status");
    }
  };

  const openDriverDetails = (driver) => {
    setSelectedDriver(driver);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDriver(null);
  };

  useEffect(() => {
    getALLDrivers();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent"
          ></motion.div>
          <p className="mt-4 text-gray-600 font-medium">Loading drivers...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <Toaster position="top-right" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-9xl mx-auto"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Drivers Management
            </h1>
            <p className="text-gray-600 mt-2">Manage and verify your drivers</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Driver
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Contact
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Car Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Documents
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Joined
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allDrivers.map((driver) => (
                    <motion.tr
                      key={driver._id}
                      variants={itemVariants}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <FiUser className="h-5 w-5 text-indigo-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {driver.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {driver._id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <FiMail className="mr-2 text-gray-400" />
                          {driver.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {driver.withCar ? (
                            <div>
                              <div className="flex items-center">
                                <FaCar className="mr-2 text-gray-400" />
                                {driver.carName} ({driver.carType})
                              </div>
                              <div className="ml-6 text-xs text-gray-500">
                                {driver.numberPlate}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center text-gray-500">
                              <FaCar className="mr-2" />
                              No Car
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center">
                            <FiCreditCard className="mr-2 text-gray-400" />
                            License - {driver.license ? "Uploaded" : "Missing"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            driver.verfied
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {driver.verfied ? "Verified" : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <FiClock className="mr-2 text-gray-400" />
                          {formatDate(driver.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openDriverDetails(driver)}
                            className="flex items-center text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors"
                          >
                            <FiEye className="mr-1" /> Details
                          </motion.button>
                          {driver.verfied ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                handleVerification(driver._id, false)
                              }
                              className="flex items-center text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
                            >
                              <FiXCircle className="mr-1" /> Unverify
                            </motion.button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                handleVerification(driver._id, true)
                              }
                              className="flex items-center text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-md transition-colors"
                            >
                              <FiCheckCircle className="mr-1" /> Verify
                            </motion.button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {allDrivers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <FiAlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No drivers
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by adding a new driver.
                </p>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-gray-500"
          >
            <p>
              Showing {allDrivers.length} driver
              {allDrivers.length !== 1 ? "s" : ""}
            </p>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {modalOpen && selectedDriver && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-opacity-50">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Driver Details
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                        <FiUser className="mr-2" /> Personal Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{selectedDriver.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{selectedDriver.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Driver ID</p>
                          <p className="font-medium">{selectedDriver._id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Joined Date</p>
                          <p className="font-medium">
                            {formatDate(selectedDriver.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                        <FiCheckCircle className="mr-2" /> Verification Status
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Account Status</span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              selectedDriver.verfied
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {selectedDriver.verfied ? "Verified" : "Pending"}
                          </span>
                        </div>

                        <div className="pt-4">
                          {selectedDriver.verfied ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                handleVerification(selectedDriver._id, false)
                              }
                              className="w-full flex items-center justify-center text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-md transition-colors"
                            >
                              <FiXCircle className="mr-2" /> Revoke Verification
                            </motion.button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                handleVerification(selectedDriver._id, true)
                              }
                              className="w-full flex items-center justify-center text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-md transition-colors"
                            >
                              <FiCheckCircle className="mr-2" /> Verify Driver
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>

                    {selectedDriver.withCar && (
                      <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                          <FaCar className="mr-2" /> Car Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Car Name</p>
                            <p className="font-medium">
                              {selectedDriver.carName}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Car Type</p>
                            <p className="font-medium">
                              {selectedDriver.carType}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Number Plate
                            </p>
                            <p className="font-medium">
                              {selectedDriver.numberPlate}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {!selectedDriver.withCar && (
                      <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                          <FaCar className="mr-2" /> Car Details
                        </h3>
                        <p className="text-gray-500 italic">
                          No car information available
                        </p>
                      </div>
                    )}

                    <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                        <FiFile className="mr-2" /> Documents
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-700 mb-2">
                            Driver's License
                          </h4>
                          {selectedDriver.license ? (
                            <div className="flex flex-col items-center">
                              <div className="w-full h-48 bg-gray-200 rounded-md overflow-hidden mb-2">
                                <img
                                  src={selectedDriver.license}
                                  alt="Driver's License"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <a
                                href={selectedDriver.license}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
                              >
                                <FiDownload className="mr-1" /> Download
                              </a>
                            </div>
                          ) : (
                            <p className="text-gray-500 italic">
                              No license uploaded
                            </p>
                          )}
                        </div>
{/* 
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-700 mb-2">
                            Aadhar Card
                          </h4>
                          {selectedDriver.adhar ? (
                            <div className="flex flex-col items-center">
                              <div className="w-full h-48 bg-gray-200 rounded-md overflow-hidden mb-2">
                                <img
                                  src={selectedDriver.adhar}
                                  alt="Aadhar Card"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <a
                                href={selectedDriver.adhar}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
                              >
                                <FiDownload className="mr-1" /> Download
                              </a>
                            </div>
                          ) : (
                            <p className="text-gray-500 italic">
                              No Aadhar card uploaded
                            </p>
                          )}
                        </div> */}
                      </div>
                    </div>

                    <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Additional Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Total Bookings
                          </p>
                          <p className="font-medium">
                            {selectedDriver.bookings?.length || 0}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Total Earnings
                          </p>
                          <p className="font-medium">
                            ₹
                            {selectedDriver.earning?.reduce(
                              (total, earn) =>
                                total + (parseFloat(earn.earned) || 0),
                              0
                            ) || 0}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Last Updated</p>
                          <p className="font-medium">
                            {formatDate(selectedDriver.updatedAt)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Has Car</p>
                          <p className="font-medium">
                            {selectedDriver.withCar ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AllDrivers;
