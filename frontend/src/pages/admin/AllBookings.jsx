import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaCar,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheck,
  FaClock,
  FaSearch,
  FaFilter,
  FaSort,
  FaUserCheck,
  FaTimes,
} from "react-icons/fa";
import AdminHeader from "../../components/AdminHeader";

const AllBookings = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [allDrivers, setAllDrivers] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get(
        "https://drive-ease-ab1k.onrender.com/booking/get-all"
      );
      setAllBookings(data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getALLDrivers = async () => {
    try {
      const { data } = await axios.get(
        "https://drive-ease-ab1k.onrender.com/driver/getALLDriver"
      );
      setAllDrivers(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const assignDriver = async (bookingId, driverId) => {
    setAssigning(true);
    try {
      await axios.post(
        "https://drive-ease-ab1k.onrender.com/booking/assign-driver",
        {
          bookingId,
          driverId,
        }
      );
      await getAllBookings();
      setShowDriverModal(false);
      setSelectedBooking(null);
    } catch (error) {
      console.log(error);
    } finally {
      setAssigning(false);
    }
  };

  useEffect(() => {
    getAllBookings();
    getALLDrivers();
  }, []);

  const filteredBookings = allBookings
    .filter((booking) => {
      const matchesSearch =
        booking.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (booking.carType &&
          booking.carType.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "started" && booking.started) ||
        (statusFilter === "ended" && booking.ended) ||
        (statusFilter === "pending" && !booking.started && !booking.ended);

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.dateTime) - new Date(a.dateTime);
      } else if (sortBy === "from") {
        return a.from.localeCompare(b.from);
      } else if (sortBy === "to") {
        return a.to.localeCompare(b.to);
      }
      return 0;
    });

  const openDriverModal = (booking) => {
    setSelectedBooking(booking);
    setShowDriverModal(true);
  };

  const getStatusBadge = (booking) => {
    if (booking.ended) {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          Completed
        </span>
      );
    } else if (booking.started) {
      return (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          In Progress
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
          Pending
        </span>
      );
    }
  };

  const getAvailableDrivers = (booking) => {
    if (booking.withCar) {
      return allDrivers.filter(
        (driver) => driver.withCar && driver.carType === booking.carType
      );
    } else {
      return allDrivers.filter((driver) => !driver.withCar);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <AdminHeader />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Booking Management
          </h1>
          <p className="text-gray-600">
            Manage and assign drivers to all bookings
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search bookings..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center">
                <FaFilter className="text-gray-400 mr-2" />
                <select
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="ended">Completed</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <FaSort className="text-gray-400 mr-2" />
                <select
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="from">Sort by Origin</option>
                  <option value="to">Sort by Destination</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bookings Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Trip Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Service Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date & Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Car Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <motion.tr
                      key={booking._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaMapMarkerAlt className="text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.from}
                            </div>
                            <div className="text-sm text-gray-500">to</div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.to}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            booking.withCar
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {booking.withCar ? "Car with Driver" : "Driver Only"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaCalendarAlt className="text-gray-400 mr-2" />
                          <div className="text-sm text-gray-900">
                            {new Date(booking.dateTime).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center mt-1">
                          <FaClock className="text-gray-400 mr-2" />
                          <div className="text-sm text-gray-500">
                            {new Date(booking.dateTime).toLocaleTimeString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaCar className="text-gray-400 mr-2" />
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full capitalize">
                            {booking.withCar ? booking.carType : "No Car"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(booking)}
                        {booking.driver && (
                          <div className="text-xs text-gray-500 mt-1">
                            Driver Assigned
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {booking.driver ? (
                          <motion.button
                            initial={{ opacity: 0.8 }}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed flex items-center"
                          >
                            <FaUserCheck className="mr-2" />
                            Driver Assigned
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openDriverModal(booking)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Assign Driver
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Driver Assignment Modal */}
        {showDriverModal && selectedBooking && (
          <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Assign Driver
                  </h2>
                  <button
                    onClick={() => setShowDriverModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <p className="text-gray-600 mb-6">
                  Select a driver for this booking
                </p>

                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">
                    Booking Details
                  </h3>
                  <p>
                    <span className="font-medium">Service Type:</span>{" "}
                    {selectedBooking.withCar
                      ? "Car with Driver"
                      : "Driver Only"}
                  </p>
                  <p>
                    <span className="font-medium">From:</span>{" "}
                    {selectedBooking.from}
                  </p>
                  <p>
                    <span className="font-medium">To:</span>{" "}
                    {selectedBooking.to}
                  </p>
                  <p>
                    <span className="font-medium">When:</span>{" "}
                    {new Date(selectedBooking.dateTime).toLocaleString()}
                  </p>
                  {selectedBooking.withCar && (
                    <p>
                      <span className="font-medium">Car Type:</span>{" "}
                      <span className="capitalize">
                        {selectedBooking.carType}
                      </span>
                    </p>
                  )}
                </div>

                <h3 className="font-medium text-gray-700 mb-4">
                  Available Drivers
                </h3>

                <div className="space-y-3">
                  {getAvailableDrivers(selectedBooking).length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      {selectedBooking.withCar
                        ? `No drivers available for ${selectedBooking.carType} cars`
                        : "No driver-only drivers available"}
                    </div>
                  ) : (
                    getAvailableDrivers(selectedBooking).map((driver) => (
                      <motion.div
                        key={driver._id}
                        whileHover={{ scale: 1.02 }}
                        className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-full overflow-hidden">
                            {driver.profilePhoto ? (
                              <img
                                src={driver.profilePhoto}
                                alt={driver.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-gray-300">
                                <FaUser className="text-gray-600" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <h4 className="font-medium text-gray-900">
                              {driver.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {driver.email}
                            </p>
                            {driver.withCar ? (
                              <p className="text-xs text-gray-500">
                                {driver.carName} • {driver.numberPlate}
                              </p>
                            ) : (
                              <p className="text-xs text-gray-500">No Car</p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            assignDriver(selectedBooking._id, driver._id)
                          }
                          disabled={assigning}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors disabled:opacity-50"
                        >
                          {assigning ? "Assigning..." : "Assign"}
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setShowDriverModal(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllBookings;
