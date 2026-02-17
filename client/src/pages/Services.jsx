import { useState } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";

export const Services = () => {
    const {
        services,
        isLoading,
        page,
        totalPages,
        setPage,
        limit,
        setLimit,
        user,
        getServices
    } = useAuth();

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        service: "",
        description: "",
        price: "",
        provider: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddService = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/data/service",
                formData,
                { withCredentials: true }
            );

            if (response.status === 201) {
                setShowForm(false);
                setFormData({
                    service: "",
                    description: "",
                    price: "",
                    provider: ""
                });

                getServices(page, limit); // refresh services
            }
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
                <h2 className="text-2xl font-semibold text-white animate-pulse">
                    Loading services...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 py-12 px-4">

            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Our Services
                </h2>

                {/* ADMIN BUTTON */}
                {user?.isAdmin && (
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition"
                        >
                            Add New Service
                        </button>
                    </div>
                )}

                {/* MODAL */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
                            <h3 className="text-xl font-bold mb-4 text-center">
                                Add New Service
                            </h3>

                            <input
                                name="service"
                                placeholder="Service Name"
                                value={formData.service}
                                onChange={handleChange}
                                className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                name="provider"
                                placeholder="Provider"
                                value={formData.provider}
                                onChange={handleChange}
                                className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />

                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddService}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* FILTER */}
                <div className="flex justify-end items-center mb-8">
                    <label className="mr-3 font-medium text-gray-700">
                        Records Per Page:
                    </label>
                    <select
                        value={limit}
                        onChange={(e) => {
                            setPage(1);
                            setLimit(Number(e.target.value));
                        }}
                        className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value={2}>2</option>
                        <option value={4}>4</option>
                        <option value={6}>6</option>
                        <option value={8}>8</option>
                    </select>
                </div>

                {/* SERVICES GRID */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((curElem, index) => {
                        const { price, description, provider, service } = curElem;

                        return (
                            <div
                                key={index}
                                className="bg-linear-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
                            >
                                <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                                    {service}
                                </h3>

                                <p className="text-gray-600 mb-2">
                                    <span className="font-semibold text-gray-800">
                                        Description:
                                    </span>{" "}
                                    {description}
                                </p>

                                <p className="text-gray-600 mb-2">
                                    <span className="font-semibold text-gray-800">
                                        Provider:
                                    </span>{" "}
                                    {provider}
                                </p>

                                <p className="text-lg font-bold text-purple-600 mt-4">
                                    Rs: {price}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* PAGINATION */}
                <div className="flex justify-center items-center gap-3 mt-12 flex-wrap">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className={`px-4 py-2 rounded-lg font-medium shadow-md transition 
                            ${page === 1
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                            }`}
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => setPage(pageNumber)}
                                className={`px-4 py-2 rounded-lg font-medium shadow-md transition 
                                    ${page === pageNumber
                                        ? "bg-purple-600 text-white scale-110"
                                        : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className={`px-4 py-2 rounded-lg font-medium shadow-md transition 
                            ${page === totalPages
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                            }`}
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    );
};
