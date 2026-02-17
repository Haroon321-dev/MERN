import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";

export const Register = () => {

    const [visible, setVisible] = useState(true);

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/route/register",
                user,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            console.log("Response from server:", response.data.extraDetails);

            setUser({
                username: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
            });

            toast.success("Registration Successful!");
            navigate("/");

        } catch (error) {
            console.log("Registration Error:", error);

            const message =
                error.response?.data?.extraDetails ||
                error.response?.data?.message ||
                "Something went wrong";

            toast.error(message);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 to-purple-700 px-4">

                <div className="bg-white w-2xl p-8 rounded-2xl shadow-2xl">

                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Create Account
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your full name"
                                required
                                autoComplete="off"
                                value={user.username}
                                onChange={handleInput}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                autoComplete="off"
                                value={user.email}
                                onChange={handleInput}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">
                                Phone
                            </label>
                            <input
                                type="number"
                                name="phone"
                                placeholder="Enter your phone number"
                                required
                                autoComplete="off"
                                value={user.phone}
                                onChange={handleInput}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block text-lg font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type={visible ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                required
                                autoComplete="off"
                                value={user.password}
                                onChange={handleInput}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                            <span
                                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                                onClick={() => setVisible(!visible)}
                            >
                                {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </span>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type={visible ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm password"
                                required
                                autoComplete="off"
                                value={user.confirmPassword}
                                onChange={handleInput}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white text-lg py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
                        >
                            Register Now
                        </button>

                        {/* Login Link */}
                        <p className="text-center text-lg text-gray-600 mt-4">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-indigo-600 font-medium hover:underline"
                            >
                                Login
                            </Link>
                        </p>

                    </form>
                </div>
            </div>

        </>
    );
};
