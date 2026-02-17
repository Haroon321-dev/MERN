import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Mail, Loader2 } from "lucide-react";

export const ForgotPasswordOtp = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Email is required");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                "http://localhost:5000/api/route/forgot-password-otp",
                { email },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.success("OTP sent to your Email");
            navigate("/verify-otp", { state: { email } });

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
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
                        Forgot Password
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">
                        Enter your email to receive a verification OTP
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Email Field */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Email Address
                        </label>

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
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
                        {loading && (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        )}
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>

                </form>

            </div>
        </div>
    );
};
