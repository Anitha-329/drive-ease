import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaCar,
  FaIdCard,
  FaMoneyBill,
  FaMapMarkerAlt,
  FaRoad,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
} from "react-icons/fa";
import DriverHeader from "../../components/DriverHeader";

const Profile = () => {
  const driverData = JSON.parse(localStorage.getItem("userData"));
  const id = driverData?.user?.driver?._id;

  const [driver, setDriver] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  const getDriverData = async () => {
    try {
      const { data } = await axios.post(
        "http://my-mern-api-env.eba-yh8jahid.us-east-1.elasticbeanstalk.com/driver/getSingleDriver",
        { id }
      );
      setDriver(data.driver);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDriverData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!driver) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <DriverHeader />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative mb-4 md:mb-0 md:mr-6">
                <img
                  src={driver.profilePhoto}
                  alt={driver.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                  {driver.verfied ? (
                    <FaCheckCircle className="text-white text-xl" />
                  ) : (
                    <FaTimesCircle className="text-red-500 text-xl bg-white rounded-full" />
                  )}
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-800">
                  {driver.name}
                </h1>
                <p className="text-gray-600 flex items-center justify-center md:justify-start mt-1">
                  <FaEnvelope className="mr-2 text-blue-500" /> {driver.email}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center md:justify-start">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 ${
                      driver.verfied
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {driver.verfied
                      ? "Verified Driver"
                      : "Pending Verification"}
                  </span>
                  {driver.withCar && driver.carType && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
                      {driver.carType}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mb-2">
                    Member since {formatDate(driver.createdAt)}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 mb-2">
                    {driver.withCar ? "Car with Driver" : "Driver Only"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex overflow-x-auto mb-6 bg-white rounded-xl shadow-lg">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === "profile"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Profile
            </button>
            {driver.withCar && (
              <button
                onClick={() => setActiveTab("car")}
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  activeTab === "car"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                Vehicle
              </button>
            )}
            <button
              onClick={() => setActiveTab("documents")}
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === "documents"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === "bookings"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab("earnings")}
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === "earnings"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Earnings
            </button>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaUser className="mr-2 text-blue-500" /> Personal
                    Information
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-medium">{driver.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email Address</p>
                      <p className="font-medium">{driver.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Service Type</p>
                      <p className="font-medium">
                        {driver.withCar ? "Car with Driver" : "Driver Only"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="font-medium">
                        {formatDate(driver.createdAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p
                        className={`font-medium ${
                          driver.verfied ? "text-green-600" : "text-yellow-600"
                        }`}
                      >
                        {driver.verfied ? "Verified" : "Pending Verification"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-5 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaIdCard className="mr-2 text-green-500" /> Identification
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Driver License</p>
                      <div className="mt-2">
                        <img
                          src={driver.license}
                          alt="Driver License"
                          className="h-32 w-full object-cover rounded-lg shadow-md cursor-pointer"
                          onClick={() => window.open(driver.license, "_blank")}
                        />
                      </div>
                    </div>
                    {driver.adhar && (
                      <div>
                        <p className="text-sm text-gray-600">Aadhar Card</p>
                        <div className="mt-2">
                          <img
                            src={driver.adhar}
                            alt="Aadhar Card"
                            className="h-32 w-full object-cover rounded-lg shadow-md cursor-pointer"
                            onClick={() => window.open(driver.adhar, "_blank")}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Car Tab - Only show if driver has a car */}
            {activeTab === "car" && driver.withCar && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="bg-purple-50 p-5 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaCar className="mr-2 text-purple-500" /> Vehicle Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Car Name</p>
                      <p className="font-medium text-lg">{driver.carName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Car Type</p>
                      <p className="font-medium capitalize">{driver.carType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Number Plate</p>
                      <p className="font-medium text-xl bg-gray-100 p-2 rounded-md inline-block">
                        {driver.numberPlate}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Documents Tab */}
            {activeTab === "documents" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Driver License
                  </h2>
                  <div className="mt-2">
                    <img
                      src={driver.license}
                      alt="Driver License"
                      className="w-full h-64 object-contain rounded-lg shadow-md cursor-pointer"
                      onClick={() => window.open(driver.license, "_blank")}
                    />
                  </div>
                </div>

                {driver.adhar && (
                  <div className="bg-green-50 p-5 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Aadhar Card
                    </h2>
                    <div className="mt-2">
                      <img
                        src={driver.adhar}
                        alt="Aadhar Card"
                        className="w-full h-64 object-contain rounded-lg shadow-md cursor-pointer"
                        onClick={() => window.open(driver.adhar, "_blank")}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Bookings Tab */}
            {activeTab === "bookings" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {driver.bookings && driver.bookings.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {driver.bookings.map((booking, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">
                              Booking #{index + 1}
                            </h3>
                            <div className="mt-2 flex items-center">
                              <FaMapMarkerAlt className="text-red-500 mr-2" />
                              <span>
                                {booking.from} to {booking.to}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center">
                              <FaRoad className="text-blue-500 mr-2" />
                              <span>Distance: {booking.distance}</span>
                            </div>
                            <div className="mt-1 flex items-center">
                              <FaMoneyBill className="text-green-500 mr-2" />
                              <span>Price: ₹{booking.price}</span>
                            </div>
                            <div className="mt-1 flex items-center">
                              <FaCar className="text-purple-500 mr-2" />
                              <span>
                                Service:{" "}
                                {booking.withCar
                                  ? "Car with Driver"
                                  : "Driver Only"}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span
                              className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                                booking.ended
                                  ? "bg-green-100 text-green-800"
                                  : booking.started
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {booking.ended
                                ? "Completed"
                                : booking.started
                                ? "In Progress"
                                : "Pending"}
                            </span>
                            <p className="text-sm text-gray-500 mt-1">
                              <FaClock className="inline mr-1" />
                              {formatDate(booking.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <FaRoad className="text-5xl text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700">
                      No bookings yet
                    </h3>
                    <p className="text-gray-500 mt-2">
                      Your booking history will appear here
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Earnings Tab */}
            {activeTab === "earnings" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {driver.earning && driver.earning.length > 0 ? (
                  <div>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6">
                      <h2 className="text-2xl font-bold">Total Earnings</h2>
                      <p className="text-3xl mt-2">
                        ₹
                        {driver.earning
                          .reduce(
                            (total, earn) =>
                              total + parseFloat(earn.earned || 0),
                            0
                          )
                          .toFixed(2)}
                      </p>
                      <p className="mt-1">
                        From {driver.earning.length} completed trips
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {driver.earning.map((earn, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-lg border shadow-sm"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold">
                                Trip #{index + 1}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                Completed on{" "}
                                {formatDate(earn.booking?.createdAt)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">
                                ₹{earn.earned}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <FaMoneyBill className="text-5xl text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700">
                      No earnings yet
                    </h3>
                    <p className="text-gray-500 mt-2">
                      Your earnings will appear here after completed trips
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
          >
            <div className="bg-white p-4 rounded-xl shadow-lg flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <FaRoad className="text-blue-500 text-2xl" />
              </div>
              <div>
                <p className="text-gray-600">Total Trips</p>
                <p className="text-2xl font-bold">
                  {driver.bookings?.length || 0}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-lg flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <FaMoneyBill className="text-green-500 text-2xl" />
              </div>
              <div>
                <p className="text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold">
                  ₹
                  {driver.earning
                    ?.reduce(
                      (total, earn) => total + parseFloat(earn.earned || 0),
                      0
                    )
                    .toFixed(2) || 0}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-lg flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <FaCar className="text-purple-500 text-2xl" />
              </div>
              <div>
                <p className="text-gray-600">Service Type</p>
                <p className="text-2xl font-bold">
                  {driver.withCar ? "Car with Driver" : "Driver Only"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Profile;
