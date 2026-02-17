import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Key, Mail } from "lucide-react";

export const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    if (!email) {
        navigate("/forgot-password-otp");
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otp || !password) {
            toast.error("All fields are required");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                "http://localhost:5000/api/route/reset-password-otp",
                {
                    email,
                    otp,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.success("Password reset successful");
            navigate("/login");

        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Verify OTP
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">
                        Enter the OTP sent to <span className="font-medium">{email}</span> and set a new password
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative">

                    {/* OTP Field */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            OTP
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Enter 6 digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={visible ? "text" : "password"}
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                            <div
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                                onClick={() => setVisible(!visible)}
                            >
                                {visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition duration-300 flex items-center justify-center gap-2
                            ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 hover:scale-105 hover:shadow-2xl"
                            }`}
                    >
                        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                        {loading ? "Verifying..." : "Reset Password"}
                    </button>

                </form>
            </div>
        </div>
    );
};

