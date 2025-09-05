import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCar,
  FaUserShield,
  FaIdCard,
  FaFileUpload,
  FaTimes,
  FaCarSide,
  FaList,
  FaIdCardAlt,
  FaCamera,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "rider",
    license: "",
    adhar: "",
    carName: "",
    numberPlate: "",
    carType: "",
    profilePhoto: "",
    withCar: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [licenseFile, setLicenseFile] = useState(null);
  const [licensePreview, setLicensePreview] = useState(null);
  const [adharFile, setAdharFile] = useState(null);
  const [adharPreview, setAdharPreview] = useState(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingLicense, setUploadingLicense] = useState(false);
  const [uploadingAdhar, setUploadingAdhar] = useState(false);
  const [uploadingProfilePhoto, setUploadingProfilePhoto] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadToCloudinary = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hg73yvrn");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/didyxuyd5/image/upload",
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleLicenseUpload = async () => {
    if (!licenseFile) return;

    setUploadingLicense(true);
    try {
      const licenseUrl = await uploadToCloudinary(licenseFile, "license");
      setFormData((prev) => ({ ...prev, license: licenseUrl }));
      alert("License uploaded successfully!");
    } catch (err) {
      alert("Failed to upload license!");
      console.error(err);
    } finally {
      setUploadingLicense(false);
    }
  };

  const handleAdharUpload = async () => {
    if (!adharFile) return;

    setUploadingAdhar(true);
    try {
      const adharUrl = await uploadToCloudinary(adharFile, "adhar");
      setFormData((prev) => ({ ...prev, adhar: adharUrl }));
      alert("Aadhaar uploaded successfully!");
    } catch (err) {
      alert("Failed to upload Aadhaar!");
      console.error(err);
    } finally {
      setUploadingAdhar(false);
    }
  };

  const handleProfilePhotoUpload = async () => {
    if (!profilePhotoFile) return;

    setUploadingProfilePhoto(true);
    try {
      const profilePhotoUrl = await uploadToCloudinary(
        profilePhotoFile,
        "profile"
      );
      setFormData((prev) => ({ ...prev, profilePhoto: profilePhotoUrl }));
      alert("Profile photo uploaded successfully!");
    } catch (err) {
      alert("Failed to upload profile photo!");
      console.error(err);
    } finally {
      setUploadingProfilePhoto(false);
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "license") {
        setLicenseFile(file);
        setLicensePreview(reader.result);
      } else if (type === "adhar") {
        setAdharFile(file);
        setAdharPreview(reader.result);
      } else if (type === "profilePhoto") {
        setProfilePhotoFile(file);
        setProfilePhotoPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (type) => {
    if (type === "license") {
      setLicenseFile(null);
      setLicensePreview(null);
      setFormData((prev) => ({ ...prev, license: "" }));
    } else if (type === "adhar") {
      setAdharFile(null);
      setAdharPreview(null);
      setFormData((prev) => ({ ...prev, adhar: "" }));
    } else if (type === "profilePhoto") {
      setProfilePhotoFile(null);
      setProfilePhotoPreview(null);
      setFormData((prev) => ({ ...prev, profilePhoto: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.role === "admin") {
      if (
        formData.email === "admin@gmail.com" &&
        formData.password === "admin@123"
      ) {
        localStorage.setItem(
          "admin",
          JSON.stringify({
            name: formData.name,
            email: formData.email,
            role: "admin",
          })
        );
        navigate("/admin/dashboard");
        return;
      } else {
        alert("Invalid admin credentials. Use admin@gmail.com and admin@123");
        return;
      }
    }

    if (formData.role === "driver") {
      if (!formData.license || !formData.profilePhoto) {
        alert(
          "Please upload all required documents: license, Aadhaar, and profile photo!"
        );
        return;
      }

      if (
        formData.withCar &&
        (!formData.carName || !formData.numberPlate || !formData.carType)
      ) {
        alert("Please fill in all car details!");
        return;
      }
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      ...(formData.role === "driver" && {
        license: formData.license,
        adhar: formData.adhar,
        profilePhoto: formData.profilePhoto,
        withCar: formData.withCar,
        ...(formData.withCar && {
          carName: formData.carName,
          numberPlate: formData.numberPlate,
          carType: formData.carType,
        }),
      }),
    };

    setUploading(true);
    try {
      let endpoint = "";
      let storageKey = "";
      let redirectPath = "";

      if (formData.role === "driver") {
        endpoint =
          "https://my-mern-api-env.eba-yh8jahid.us-east-1.elasticbeanstalk.com/driver/signup";
        storageKey = "driver";
        redirectPath = "/driver/profile";
      } else if (formData.role === "rider") {
        endpoint =
          "https://my-mern-api-env.eba-yh8jahid.us-east-1.elasticbeanstalk.com/user/signup";
        storageKey = "user";
        redirectPath = "/user/dashboard";
      }

      const res = await axios.post(endpoint, payload);
      if (res.data.success) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Signup failed: " + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sm:mx-auto sm:w-full sm:max-w-4xl"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
            <FaUserPlus className="text-3xl" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl"
      >
        <div className="bg-white py-8 px-6 shadow-xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="py-3 pl-10 pr-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="py-3 pl-10 pr-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {formData.role === "driver" && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Do you have your own car?
                  </label>
                  <div className="flex space-x-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 py-3 px-4 rounded-md border-2 flex items-center justify-center space-x-2 ${
                        formData.withCar
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, withCar: true })
                      }
                    >
                      {formData.withCar ? (
                        <FaCheckCircle className="text-blue-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
                      )}
                      <span>Yes, I have my own car</span>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 py-3 px-4 rounded-md border-2 flex items-center justify-center space-x-2 ${
                        !formData.withCar
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, withCar: false })
                      }
                    >
                      {!formData.withCar ? (
                        <FaTimesCircle className="text-blue-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
                      )}
                      <span>No, I don't have a car</span>
                    </motion.button>
                  </div>
                </div>

                {formData.withCar && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label
                        htmlFor="carName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Car Name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCarSide className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="carName"
                          name="carName"
                          type="text"
                          required={formData.withCar}
                          value={formData.carName}
                          onChange={handleChange}
                          className="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Toyota Camry"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="numberPlate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Number Plate
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaIdCardAlt className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="numberPlate"
                          name="numberPlate"
                          type="text"
                          required={formData.withCar}
                          value={formData.numberPlate}
                          onChange={handleChange}
                          className="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., ABC1234"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="carType"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Car Type
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaList className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="carType"
                          name="carType"
                          required={formData.withCar}
                          value={formData.carType}
                          onChange={handleChange}
                          className="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Car Type</option>
                          <option value="hatchback">Hatchback</option>
                          <option value="sedan">Sedan</option>
                          <option value="suv">SUV</option>
                          <option value="luxury">Luxury</option>
                          <option value="electric">Electric</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Photo
                    </label>
                    <div className="mt-1">
                      <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg relative overflow-hidden">
                        {profilePhotoPreview ? (
                          <>
                            <img
                              src={profilePhotoPreview}
                              alt="Profile preview"
                              className="h-full w-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeFile("profilePhoto")}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <FaTimes className="text-xs" />
                            </button>
                          </>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                            <div className="flex flex-col items-center justify-center">
                              <FaCamera className="text-3xl text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">
                                Upload Profile Photo
                              </p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileChange(e, "profilePhoto")
                              }
                            />
                          </label>
                        )}
                      </div>
                      {profilePhotoFile && !formData.profilePhoto && (
                        <div className="mt-2">
                          <button
                            type="button"
                            onClick={handleProfilePhotoUpload}
                            disabled={uploadingProfilePhoto}
                            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                              uploadingProfilePhoto
                                ? "bg-blue-400"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                          >
                            {uploadingProfilePhoto
                              ? "Uploading..."
                              : "Upload Profile Photo"}
                          </button>
                        </div>
                      )}
                      {formData.profilePhoto && (
                        <p className="mt-2 text-sm text-green-600">
                          ✓ Profile photo uploaded
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Driver License
                    </label>
                    <div className="mt-1">
                      <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg relative overflow-hidden">
                        {licensePreview ? (
                          <>
                            <img
                              src={licensePreview}
                              alt="License preview"
                              className="h-full w-full object-contain"
                            />
                            <button
                              type="button"
                              onClick={() => removeFile("license")}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <FaTimes className="text-xs" />
                            </button>
                          </>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                            <div className="flex flex-col items-center justify-center">
                              <FaIdCard className="text-3xl text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">
                                Upload License (JPEG/PNG)
                              </p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, "license")}
                            />
                          </label>
                        )}
                      </div>
                      {licenseFile && !formData.license && (
                        <div className="mt-2">
                          <button
                            type="button"
                            onClick={handleLicenseUpload}
                            disabled={uploadingLicense}
                            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                              uploadingLicense
                                ? "bg-blue-400"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                          >
                            {uploadingLicense
                              ? "Uploading..."
                              : "Upload License"}
                          </button>
                        </div>
                      )}
                      {formData.license && (
                        <p className="mt-2 text-sm text-green-600">
                          ✓ License uploaded
                        </p>
                      )}
                    </div>
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aadhaar Card
                    </label>
                    <div className="mt-1">
                      <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg relative overflow-hidden">
                        {adharPreview ? (
                          <>
                            <img
                              src={adharPreview}
                              alt="Aadhaar preview"
                              className="h-full w-full object-contain"
                            />
                            <button
                              type="button"
                              onClick={() => removeFile("adhar")}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <FaTimes className="text-xs" />
                            </button>
                          </>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                            <div className="flex flex-col items-center justify-center">
                              <FaFileUpload className="text-3xl text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">
                                Upload Aadhaar (JPEG/PNG)
                              </p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, "adhar")}
                            />
                          </label>
                        )}
                      </div>
                      {adharFile && !formData.adhar && (
                        <div className="mt-2">
                          <button
                            type="button"
                            onClick={handleAdharUpload}
                            disabled={uploadingAdhar}
                            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                              uploadingAdhar
                                ? "bg-blue-400"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                          >
                            {uploadingAdhar ? "Uploading..." : "Upload Aadhaar"}
                          </button>
                        </div>
                      )}
                      {formData.adhar && (
                        <p className="mt-2 text-sm text-green-600">
                          ✓ Aadhaar uploaded
                        </p>
                      )}
                    </div>
                  </div> */}
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Register as
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                    formData.role === "rider"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setFormData({ ...formData, role: "rider" })}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        formData.role === "rider"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <FaUser className="text-xl" />
                    </div>
                    <span className="font-medium">User</span>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      Book rides easily
                    </p>
                  </div>
                  {formData.role === "rider" && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                    formData.role === "driver"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setFormData({ ...formData, role: "driver" })}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        formData.role === "driver"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <FaCar className="text-xl" />
                    </div>
                    <span className="font-medium">Driver</span>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      Earn money driving
                    </p>
                  </div>
                  {formData.role === "driver" && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>

                
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the{" "}
                <Link
                  to="/terms-of-services"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-policy"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={uploading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  uploading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {uploading ? "Processing..." : "Create Account"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
