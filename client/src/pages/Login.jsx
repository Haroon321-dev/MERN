import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const URL = "http://localhost:5000/api/route/login";
const GOOGLE_AUTH_URL = "http://localhost:5000/api/route/google-auth";

export const Login = () => {
    const { setUser, userAuthentication } = useAuth(); // context setter
    const [visible, setVisible] = useState(true);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(URL, formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true, // cookies/session
            });

            // success
            setFormData({ email: "", password: "" });
            await userAuthentication(); // update auth context
            toast.success("Login Successful!");
            navigate("/");

        } catch (error) {
            console.log("Login Error:", error);
            toast.error(
                error.response?.data?.extraDetails ||
                error.response?.data?.message ||
                "Login Failed!"
            );
        }
    };

    // Google login
    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential; // JWT from Google
            await axios.post(
                GOOGLE_AUTH_URL,
                { token },
                { withCredentials: true }
            );

            await userAuthentication();
            toast.success("Google Login Successful!");
            navigate("/");
        } catch (error) {
            console.log("Google Login Error:", error);
            toast.error(error.response?.data?.message || "Google login failed!");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 to-purple-700 px-4">

            <div className="bg-white w-xl p-8 rounded-2xl shadow-2xl">

                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your Email!"
                            required
                            autoComplete="off"
                            value={formData.email}
                            onChange={handleInput}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-lg font-medium text-gray-700 mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            type={visible ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Enter Password!"
                            required
                            autoComplete="off"
                            value={formData.password}
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

                    {/* Forgot Password */}
                    <p className="text-sm text-gray-600 text-right">
                        <Link to="/forgot-password-otp" className="text-indigo-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </p>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white text-lg py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
                    >
                        Login!
                    </button>

                    {/* Register Link */}
                    <p className="text-center text-sm text-gray-600 mt-2">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-indigo-600 font-medium hover:underline">
                            Register!
                        </Link>
                    </p>

                </form>

                {/* Google Login */}
                <div className="mt-6 text-center">
                    <p className="mb-2 text-gray-700 font-medium">Or login with Google:</p>
                    <div className="inline-block">
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() => toast.error("Google Login Failed")}
                        />
                    </div>
                </div>

            </div>
        </div>

    );
};
