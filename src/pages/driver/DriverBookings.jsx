import React, { useEffect, useState } from "react";
import DriverHeader from "../../components/DriverHeader";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaPlay,
  FaStop,
  FaMoneyBillWave,
  FaCheckCircle,
  FaInfoCircle,
  FaRoute,
  FaUser,
} from "react-icons/fa";

const DriverBookings = () => {
  const driverData = JSON.parse(localStorage.getItem("userData"));
  const id = driverData?.user?.driver?._id;
  const [driver, setDriver] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "start" or "end"

  const getDriverData = async () => {
    try {
      const { data } = await axios.post(
        "https://my-mern-api-env.eba-yh8jahid.us-east-1.elasticbeanstalk.com/driver/getSingleDriver",
        { id }
      );
      setDriver(data.driver);
      setBookings(data.driver.bookings || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDriverData();
  }, []);

  const handleStartRide = async (booking) => {
    setSelectedBooking(booking);
    setModalType("start");
    setShowModal(true);
  };

  const handleEndRide = async (booking) => {
    setSelectedBooking(booking);
    setModalType("end");
    setShowModal(true);
  };

  const confirmAction = async () => {
    if (!selectedBooking) return;

    setActionLoading(true);
    try {
      if (modalType === "start") {
        // Start the ride
        await axios.post(
          "https://my-mern-api-env.eba-yh8jahid.us-east-1.elasticbeanstalk.com/driver/start-ride",
          {
            driverId: id,
            bookingId: selectedBooking._id,
            started: true,
          }
        );

        // Update local state
        const updatedBookings = bookings.map((booking) =>
          booking._id === selectedBooking._id
            ? { ...booking, started: true }
            : booking
        );
        setBookings(updatedBookings);
      } else if (modalType === "end") {
        // End the ride
        await axios.post(
          "https://my-mern-api-env.eba-yh8jahid.us-east-1.elasticbeanstalk.com/driver/end-ride",
          {
            driverId: id,
            bookingId: selectedBooking._id,
            ended: true,
          }
        );

        // Calculate driver's earnings (60% of the price)
        const price = parseFloat(selectedBooking.price) || 0;
        const driverEarning = (price * 0.6).toFixed(2);

        // Send earnings to driver
        await axios.post(
          "https://my-mern-api-env.eba-yh8jahid.us-east-1.elasticbeanstalk.com/driver/earnings",
          {
            driverId: id,
            bookingId: selectedBooking._id,
            earning: driverEarning,
          }
        );

        // Update local state
        const updatedBookings = bookings.map((booking) =>
          booking._id === selectedBooking._id
            ? { ...booking, ended: true }
            : booking
        );
        setBookings(updatedBookings);
      }

      setShowModal(false);
      setActionLoading(false);
    } catch (error) {
      console.error("Error updating booking:", error);
      setActionLoading(false);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const getStatusBadge = (booking) => {
    if (booking.ended) {
      return (
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          Completed
        </span>
      );
    } else if (booking.started) {
      return (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          In Progress
        </span>
      );
    } else {
      return (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          Scheduled
        </span>
      );
    }
  };

  if (loading) {
    return (
      <>
        <DriverHeader />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <DriverHeader />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Bookings
            </h1>
            <p className="text-gray-600">
              Manage your rides and track your earnings
            </p>
          </motion.div>

          {bookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
            >
              <FaRoute className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No bookings yet
              </h3>
              <p className="text-gray-500">
                You don't have any bookings at the moment.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 capitalize">
                          {booking.carType} Ride
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatDateTime(booking.dateTime).date}
                        </p>
                      </div>
                      {getStatusBadge(booking)}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <FaMapMarkerAlt className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">From</p>
                          <p className="font-medium">{booking.from}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-red-100 p-2 rounded-full mr-3">
                          <FaMapMarkerAlt className="text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">To</p>
                          <p className="font-medium">{booking.to}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-purple-100 p-2 rounded-full mr-3">
                          <FaClock className="text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="font-medium">
                            {formatDateTime(booking.dateTime).time}
                          </p>
                        </div>
                      </div>

                      {booking.distance && (
                        <div className="flex items-center">
                          <div className="bg-green-100 p-2 rounded-full mr-3">
                            <FaRoute className="text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Distance</p>
                            <p className="font-medium">{booking.distance}</p>
                          </div>
                        </div>
                      )}

                      {booking.price && (
                        <div className="flex items-center">
                          <div className="bg-yellow-100 p-2 rounded-full mr-3">
                            <FaMoneyBillWave className="text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Fare</p>
                            <p className="font-medium">₹{booking.price}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex space-x-3">
                      {!booking.started && !booking.ended && (
                        <button
                          onClick={() => handleStartRide(booking)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <FaPlay className="mr-2" />
                          Start Ride
                        </button>
                      )}

                      {booking.started && !booking.ended && (
                        <button
                          onClick={() => handleEndRide(booking)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <FaStop className="mr-2" />
                          End Ride
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0  backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => !actionLoading && setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {modalType === "start" ? (
                      <FaPlay className="text-2xl text-blue-600" />
                    ) : (
                      <FaStop className="text-2xl text-green-600" />
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {modalType === "start" ? "Start Ride" : "End Ride"}
                  </h3>

                  <p className="text-gray-600 mb-6">
                    {modalType === "start"
                      ? "Are you sure you want to start this ride?"
                      : "Are you sure you want to end this ride?"}
                  </p>

                  {modalType === "end" && selectedBooking?.price && (
                    <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                      <p className="text-sm text-yellow-800">
                        You will earn ₹
                        {(selectedBooking.price * 0.6).toFixed(2)} from this
                        ride (60% of ₹{selectedBooking.price})
                      </p>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowModal(false)}
                      disabled={actionLoading}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmAction}
                      disabled={actionLoading}
                      className={`flex-1 text-white py-2 px-4 rounded-lg transition-colors ${
                        modalType === "start"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {actionLoading ? "Processing..." : "Confirm"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default DriverBookings;
