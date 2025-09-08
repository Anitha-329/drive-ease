import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FaCar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimes,
  FaRoute,
  FaCarSide,
  FaUserAlt,
  FaLocationArrow,
  FaSpinner,
} from "react-icons/fa";
import UserHeader from "../../components/UserHeader";

const BookCar = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.user?.owner?._id;
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    carType: "",
    date: "",
    time: "",
    withCar: true,
  });
  const [showModal, setShowModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calculatingPrice, setCalculatingPrice] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [estimatedDistance, setEstimatedDistance] = useState(null);
  const [estimatedDuration, setEstimatedDuration] = useState(null);
  const [gettingLocation, setGettingLocation] = useState(false);

  const carTypes = [
    { value: "hatchback", label: "Hatchback", icon: FaCarSide, rate: 10 },
    { value: "sedan", label: "Sedan", icon: FaCar, rate: 12 },
    { value: "suv", label: "SUV", icon: FaCarSide, rate: 15 },
    { value: "luxury", label: "Luxury", icon: FaCar, rate: 20 },
    { value: "electric", label: "Electric", icon: FaCarSide, rate: 14 },
  ];

  const driverOnlyRate = 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleServiceType = (withCar) => {
    setFormData({
      ...formData,
      withCar,
      carType: withCar ? formData.carType : "",
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        )
          .then((response) => response.json())
          .then((data) => {
            const address = data.display_name || "Current Location";
            setFormData({
              ...formData,
              from: address,
            });
            setGettingLocation(false);
          })
          .catch((error) => {
            console.error("Error getting address:", error);
            setFormData({
              ...formData,
              from: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            });
            setGettingLocation(false);
          });
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to get your current location. Please enter it manually.");
        setGettingLocation(false);
      }
    );
  };

  const calculateEstimate = async () => {
    if (formData.from && formData.to) {
      try {
        setCalculatingPrice(true);
        const options = {
          method: "POST",
          url: "https://distanceto.p.rapidapi.com/distance/route",
          headers: {
            "x-rapidapi-key":
              "abed86941bmsh272d6cd7dc241d4p14f090jsn0c58bc076a85",
            "x-rapidapi-host": "distanceto.p.rapidapi.com",
            "Content-Type": "application/json",
          },
          data: {
            route: [
              {
                country: "India",
                name: formData.from,
              },
              {
                country: "India",
                name: formData.to,
              },
            ],
          },
        };

        const response = await axios.request(options);
        const distance = response.data.route.car.distance;
        const durationSeconds = response.data.route.car.duration;

        const hours = Math.floor(durationSeconds / 3600);
        const minutes = Math.floor((durationSeconds % 3600) / 60);
        const durationText = `${hours}h ${minutes}m`;

        setEstimatedDistance(`${distance.toFixed(1)} km`);
        setEstimatedDuration(durationText);

        let ratePerKm;
        if (formData.withCar) {
          const selectedCar = carTypes.find(
            (car) => car.value === formData.carType
          );
          ratePerKm = selectedCar ? selectedCar.rate : carTypes[0].rate;
        } else {
          ratePerKm = driverOnlyRate;
        }

        const price = (distance * ratePerKm).toFixed(0);
        setEstimatedPrice(price);
        setCalculatingPrice(false);
      } catch (error) {
        console.error("Error calculating estimate:", error);
        const distance = (Math.random() * 50 + 5).toFixed(1);
        setEstimatedDistance(`${distance} km`);
        setEstimatedDuration(`${Math.floor(distance * 2)}m`);

        let ratePerKm;
        if (formData.withCar) {
          const selectedCar = carTypes.find(
            (car) => car.value === formData.carType
          );
          ratePerKm = selectedCar ? selectedCar.rate : carTypes[0].rate;
        } else {
          ratePerKm = driverOnlyRate;
        }

        const price = (distance * ratePerKm).toFixed(0);
        setEstimatedPrice(price);
        setCalculatingPrice(false);
      }
    }
  };

  const recalculatePrice = () => {
    if (estimatedDistance) {
      setCalculatingPrice(true);
      setTimeout(() => {
        const distance = parseFloat(estimatedDistance);

        let ratePerKm;
        if (formData.withCar) {
          const selectedCar = carTypes.find(
            (car) => car.value === formData.carType
          );
          ratePerKm = selectedCar ? selectedCar.rate : carTypes[0].rate;
        } else {
          ratePerKm = driverOnlyRate;
        }

        const price = (distance * ratePerKm).toFixed(0);
        setEstimatedPrice(price);
        setCalculatingPrice(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (estimatedDistance) {
      recalculatePrice();
    }
  }, [formData.carType, formData.withCar]);

  const handleRazorpayPayment = async (bookingData) => {
    const options = {
      key: "rzp_test_ocDqI1oN10flt3",
      amount: estimatedPrice * 100,
      currency: "INR",
      name: "Car Pool Service",
      description: "Payment for your carpool ride",
      image:
        "https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      handler: async function (response) {
        try {
          const bookingResponse = await axios.post(
            "https://drive-ease-ab1k.onrender.com/user/addBooking",
            {
              ...bookingData,
              paymentId: response.razorpay_payment_id,
              paymentStatus: "completed",
            }
          );

          if (bookingResponse.data.success) {
            setBookingSuccess(true);
            setTimeout(() => {
              setShowModal(false);
              setBookingSuccess(false);
              setFormData({
                from: "",
                to: "",
                carType: "",
                date: "",
                time: "",
                withCar: true,
              });
              setEstimatedPrice(null);
              setEstimatedDistance(null);
              setEstimatedDuration(null);
            }, 2000);
          }
        } catch (error) {
          console.error("Booking error:", error);
          alert("Booking failed. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        name: userData?.user?.owner?.name || "Customer",
        email: userData?.user?.owner?.email || "customer@example.com",
        contact: userData?.user?.owner?.phone || "9999999999",
      },
      theme: {
        color: "#0d6efd",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", (response) => {
      alert("Payment Failed. Please try again.");
      console.error("Payment Failed:", response.error);
      setLoading(false);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        ...formData,
        userId,
        dateTime: `${formData.date}T${formData.time}:00`,
        price: estimatedPrice,
        distance: estimatedDistance,
        duration: estimatedDuration,
        paymentStatus: "pending",
      };

      await handleRazorpayPayment(bookingData);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <UserHeader />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Book Your Ride
            </h1>
            <p className="text-lg text-gray-600">
              Experience premium car service at your fingertips
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Service Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.label
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.withCar
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="serviceType"
                        checked={formData.withCar}
                        onChange={() => toggleServiceType(true)}
                        className="hidden"
                      />
                      <FaCar className="text-2xl mb-2 text-blue-600" />
                      <span className="text-sm font-medium">
                        Car with Driver
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        ₹10-20/km
                      </span>
                    </motion.label>

                    <motion.label
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        !formData.withCar
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="serviceType"
                        checked={!formData.withCar}
                        onChange={() => toggleServiceType(false)}
                        className="hidden"
                      />
                      <FaUserAlt className="text-2xl mb-2 text-blue-600" />
                      <span className="text-sm font-medium">Driver Only</span>
                      <span className="text-xs text-gray-500 mt-1">₹5/km</span>
                    </motion.label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Pickup Location
                      </label>
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={gettingLocation}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <FaLocationArrow className="mr-1" />
                        {gettingLocation
                          ? "Detecting..."
                          : "Use Current Location"}
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMapMarkerAlt className="h-5 w-5 text-blue-500" />
                      </div>
                      <input
                        type="text"
                        name="from"
                        value={formData.from}
                        onChange={handleChange}
                        className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter pickup location"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Drop-off Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMapMarkerAlt className="h-5 w-5 text-red-500" />
                      </div>
                      <input
                        type="text"
                        name="to"
                        value={formData.to}
                        onChange={handleChange}
                        onBlur={calculateEstimate}
                        className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter drop-off location"
                        required
                      />
                    </div>
                  </div>
                </div>

                {formData.withCar && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Car Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {carTypes.map((car) => {
                        const IconComponent = car.icon;
                        return (
                          <motion.label
                            key={car.value}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                              formData.carType === car.value
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="carType"
                              value={car.value}
                              onChange={handleChange}
                              className="hidden"
                              required={formData.withCar}
                            />
                            <IconComponent
                              className={`text-2xl mb-2 ${
                                formData.carType === car.value
                                  ? "text-blue-600"
                                  : "text-gray-600"
                              }`}
                            />
                            <span className="text-sm font-medium">
                              {car.label}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                              ₹{car.rate}/km
                            </span>
                          </motion.label>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCalendarAlt className="h-5 w-5 text-blue-500" />
                      </div>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Time
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaClock className="h-5 w-5 text-blue-500" />
                      </div>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>

                {estimatedPrice && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-blue-900">
                          Estimated Fare
                        </h3>
                        <p className="text-sm text-blue-700">
                          {estimatedDistance} • {estimatedDuration} •{" "}
                          {formData.withCar
                            ? formData.carType
                              ? `${formData.carType} car`
                              : "Car with Driver"
                            : "Driver Only"}
                        </p>
                      </div>
                      <div className="text-right">
                        {calculatingPrice ? (
                          <div className="flex items-center justify-center">
                            <FaSpinner className="animate-spin text-blue-600 mr-2" />
                            <span className="text-blue-600">
                              Calculating...
                            </span>
                          </div>
                        ) : (
                          <>
                            <p className="text-2xl font-bold text-blue-900">
                              ₹{estimatedPrice}
                            </p>
                            <p className="text-xs text-blue-600">
                              Inclusive of all taxes
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  type="button"
                  onClick={() => setShowModal(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={
                    !formData.from ||
                    !formData.to ||
                    (formData.withCar && !formData.carType) ||
                    !formData.date ||
                    !formData.time ||
                    !estimatedPrice ||
                    calculatingPrice
                  }
                  className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-colors ${
                    !formData.from ||
                    !formData.to ||
                    (formData.withCar && !formData.carType) ||
                    !formData.date ||
                    !formData.time ||
                    !estimatedPrice ||
                    calculatingPrice
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <FaRoute className="mr-2" />
                    Book Now
                  </div>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => !loading && setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                {bookingSuccess ? (
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <FaCheckCircle className="text-3xl text-green-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Booking Confirmed!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Your {formData.withCar ? "ride" : "driver"} has been
                      successfully booked.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Confirm Booking
                      </h3>
                      <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <FaTimes className="text-xl" />
                      </button>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service Type:</span>
                        <span className="font-semibold">
                          {formData.withCar ? "Car with Driver" : "Driver Only"}
                        </span>
                      </div>
                      {formData.withCar && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Car Type:</span>
                          <span className="font-semibold capitalize">
                            {formData.carType}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">From:</span>
                        <span className="font-semibold">{formData.from}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">To:</span>
                        <span className="font-semibold">{formData.to}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date & Time:</span>
                        <span className="font-semibold">
                          {new Date(
                            `${formData.date}T${formData.time}`
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Distance:</span>
                        <span className="font-semibold">
                          {estimatedDistance}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold">
                          {estimatedDuration}
                        </span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-blue-600">
                            ₹{estimatedPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {loading ? "Processing..." : "Proceed to Payment"}
                    </button>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default BookCar;
