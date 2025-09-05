import React, { useState, useEffect } from "react";
import UserHeader from "../../components/UserHeader";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageSquare,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiSend,
  FiClock,
  FiUser,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

const Queries = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const id = userData?.user?.owner?._id;
  const [queries, setQueries] = useState([]);
  const [newQuery, setNewQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Fetch user queries
  const fetchQueries = async () => {
    try {
      const response = await axios.post(
        "https://my-mern-api-env.eba-yh8jahid.us-east-1.elasticbeanstalk.com/user/getSingleUser",
        {
          id,
        }
      );
      if (response.data.success) {
        setQueries(response.data.owner.queries);
      }
    } catch (error) {
      console.error("Error fetching queries:", error);
      showNotification("Failed to fetch queries", "error");
    }
  };

  // Create a new query
  const createQuery = async () => {
    if (!newQuery.trim()) {
      showNotification("Query cannot be empty", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://my-mern-api-env.eba-yh8jahid.us-east-1.elasticbeanstalk.com/user/createQuery",
        {
          userId: id,
          queryText: newQuery,
        }
      );

      if (response.data.success) {
        setNewQuery("");
        showNotification("Query submitted successfully", "success");
        fetchQueries(); // Refresh the list
      }
    } catch (error) {
      console.error("Error creating query:", error);
      showNotification("Failed to submit query", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete a query
  const deleteQuery = async (queryId) => {
    if (!window.confirm("Are you sure you want to delete this query?")) return;

    try {
      const response = await axios.delete(
        "https://my-mern-api-env.eba-yh8jahid.us-east-1.elasticbeanstalk.com/query/delete",
        {
          data: { queryId, userId: id },
        }
      );

      if (response.data.success) {
        showNotification("Query deleted successfully", "success");
        fetchQueries(); // Refresh the list
      }
    } catch (error) {
      console.error("Error deleting query:", error);
      showNotification("Failed to delete query", "error");
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  useEffect(() => {
    if (id) {
      fetchQueries();
    }
  }, [id]);

  return (
    <>
      <UserHeader />

      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center ${
              notification.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {notification.type === "success" ? (
              <FiCheckCircle className="mr-2" />
            ) : (
              <FiAlertCircle className="mr-2" />
            )}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
              <FiMessageSquare className="mr-3 text-indigo-600" />
              Customer Support Queries
            </h1>
            <p className="text-gray-600 mt-2">
              Submit your questions and concerns. Our team will respond as soon
              as possible.
            </p>
          </motion.div>

          {/* Query Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiEdit className="mr-2 text-indigo-600" />
              Submit a New Query
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="query"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Question or Concern
                </label>
                <textarea
                  id="query"
                  rows="4"
                  value={newQuery}
                  onChange={(e) => setNewQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Describe your issue or question in detail..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={createQuery}
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                } transition-colors`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FiSend className="mr-2" />
                    Submit Query
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Query List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FiMessageSquare className="mr-2 text-indigo-600" />
              Your Previous Queries
            </h2>

            {queries.length === 0 ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                  <FiMessageSquare className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No queries yet
                </h3>
                <p className="text-gray-500">
                  Submit your first query using the form above.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {queries.map((query, index) => (
                  <motion.div
                    key={query._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-gray-800">{query.query}</p>
                        <div className="flex items-center mt-3 text-sm text-gray-500">
                          <FiClock className="mr-1.5" />
                          <span>
                            {new Date(query.createdAt).toLocaleDateString()}
                          </span>
                          <span className="mx-2">•</span>
                          <FiUser className="mr-1.5" />
                          <span>You</span>
                        </div>
                      </div>
                     
                    </div>

                 

                    {/* Admin Response (if exists) */}
                    {query.response && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-blue-900">
                              Support Team Response
                            </p>
                            <p className="mt-1 text-sm text-blue-800">
                              {query.response}
                            </p>
                            {query.respondedAt && (
                              <p className="mt-1 text-xs text-blue-600">
                                {new Date(
                                  query.respondedAt
                                ).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Queries;
