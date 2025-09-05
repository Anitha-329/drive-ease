import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import {
  FiMessageSquare,
  FiUser,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const AllQueries = () => {
  const [allQueries, setAllQueries] = useState([]);
  const [expandedQuery, setExpandedQuery] = useState(null);
  const [loading, setLoading] = useState(true);

  const getALLQueries = async () => {
    try {
      const { data } = await axios.get(
        "https://my-mern-api-env.eba-yh8jahid.us-east-1.elasticbeanstalk.com/user/allQuery"
      );
      setAllQueries(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getALLQueries();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleExpand = (id) => {
    if (expandedQuery === id) {
      setExpandedQuery(null);
    } else {
      setExpandedQuery(id);
    }
  };

  if (loading) {
    return (
      <>
        <AdminHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              User Queries
            </h1>
            <p className="text-gray-600">
              Review all user feedback and questions
            </p>
          </div>

          {allQueries.length === 0 ? (
            <div className="text-center py-12">
              <FiMessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No queries yet
              </h3>
              <p className="mt-1 text-gray-500">
                User queries will appear here when submitted.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {allQueries.map((query, index) => (
                <motion.div
                  key={query._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200"
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => toggleExpand(query._id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <FiMessageSquare className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-medium text-gray-900 truncate">
                            {query.query}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                            <div className="flex items-center">
                              <FiUser className="mr-1.5 h-4 w-4 flex-shrink-0" />
                              <span>User ID: {query.by}</span>
                            </div>
                            <div className="flex items-center">
                              <FiCalendar className="mr-1.5 h-4 w-4 flex-shrink-0" />
                              <span>{formatDate(query.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {expandedQuery === query._id ? (
                          <FiChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <FiChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedQuery === query._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Full Query Details
                            </h4>
                            <p className="text-gray-600">{query.query}</p>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-700">
                                  Submitted:
                                </span>{" "}
                                {formatDate(query.createdAt)}
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">
                                  Last Updated:
                                </span>{" "}
                                {formatDate(query.updatedAt)}
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">
                                  User ID:
                                </span>{" "}
                                {query.by}
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">
                                  Query ID:
                                </span>{" "}
                                {query._id}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllQueries;
