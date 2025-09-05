import React, { useEffect, useState } from "react";
import UserHeader from "../../components/UserHeader";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { FaCarRear } from "react-icons/fa6";

const UserProfile = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const id = userData?.user?.owner?._id;
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  const getUserData = async () => {
    try {
      console.log(id);
      const { data } = await axios.post(
        "http://my-mern-api-env.eba-yh8jahid.us-east-1.elasticbeanstalk.com/user/getSingleUser",
        {
          id,
        }
      );
      setUser(data?.owner);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <UserHeader />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
          >
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
              <div className="flex items-center">
                <div className="bg-white p-1 rounded-full">
                  <div className="bg-blue-100 rounded-full p-4">
                    <FiUser className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                <div className="ml-6">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="flex items-center mt-1">
                    <FiMail className="mr-2" />
                    {user.email}
                  </p>
                  <p className="mt-2">
                    Member since:{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`ml-8 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                    activeTab === "profile"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`py-4 px-1 text-center border-b-2 font-medium text-sm mx-8 ${
                    activeTab === "bookings"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Bookings ({user.bookings.length})
                </button>
                <button
                  onClick={() => setActiveTab("queries")}
                  className={`py-4 px-1 text-center border-b-2 font-medium text-sm ${
                    activeTab === "queries"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Queries ({user.queries.length})
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">
                      Personal Information
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FiUser className="text-gray-500 mr-3" />
                        <span className="text-gray-600">Name:</span>
                        <span className="ml-2 font-medium">{user.name}</span>
                      </div>
                      <div className="flex items-center">
                        <FiMail className="text-gray-500 mr-3" />
                        <span className="text-gray-600">Email:</span>
                        <span className="ml-2 font-medium">{user.email}</span>
                      </div>
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-500 mr-3" />
                        <span className="text-gray-600">Member since:</span>
                        <span className="ml-2 font-medium">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-500 mr-3" />
                        <span className="text-gray-600">Last updated:</span>
                        <span className="ml-2 font-medium">
                          {new Date(user.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">
                      Account Stats
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                        <span className="text-gray-600">Total Bookings</span>
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                          {user.bookings.length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                        <span className="text-gray-600">Pending Queries</span>
                        <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded">
                          {user.queries.length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                        <span className="text-gray-600">Account Status</span>
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "bookings" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-lg font-semibold mb-4 text-gray-700">
                    Your Bookings
                  </h2>
                  {user.bookings.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <FaCarRear className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No bookings yet
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Get started by making your first booking!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {user.bookings.map((booking) => (
                        <motion.div
                          key={booking._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900 capitalize">
                                  {booking.carType} Ride
                                </h3>
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                  <FiMapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                  {booking.from} to {booking.to}
                                </div>
                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                  <FiCalendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                  {new Date(
                                    booking.dateTime
                                  ).toLocaleDateString()}
                                </div>
                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                  <FiClock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                  {new Date(
                                    booking.dateTime
                                  ).toLocaleTimeString()}
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <div className="flex items-center">
                                  {booking.started ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                      In Progress
                                    </span>
                                  ) : booking.ended ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      Completed
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      Upcoming
                                    </span>
                                  )}
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                  Created:{" "}
                                  {new Date(
                                    booking.createdAt
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "queries" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-lg font-semibold mb-4 text-gray-700">
                    Your Queries
                  </h2>
                  {user.queries.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <FiCheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No queries
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        You haven't posted any queries.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {user.queries.map((query) => (
                        <div
                          key={query._id}
                          className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
                        >
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {query.query}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                {query.message}
                              </p>
                            </div>
                            <div className="flex flex-col items-end">
                              
                              <div className="mt-2 text-xs text-gray-500">
                                Created:{" "}
                                {new Date(query.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
