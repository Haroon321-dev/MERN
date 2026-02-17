import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";

const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
};

export const Contact = () => {
    const [contact, setContact] = useState(defaultContactFormData);
    const [userData, setUserData] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (userData && user) {
            setContact({
                username: user.username,
                email: user.email,
                message: "",
            });
            setUserData(false);
        }
    }, [user, userData]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/form/contact",
                contact,
                { withCredentials: true }
            );

            setContact(defaultContactFormData);
            console.log("Contact response:", response.data);
            alert("Message sent Successfully!");
        } catch (error) {
            console.log("Contact error:", error);
            alert(error.response?.data?.message || "Message not sent!");
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4 py-12">

            <div className="w-full max-w-2xl bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10">

                {/* Heading */}
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Contact Us
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Name */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="username"
                            required
                            autoComplete="off"
                            placeholder="Enter your name"
                            value={contact.username}
                            onChange={handleInput}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            autoComplete="off"
                            placeholder="Enter your email"
                            value={contact.email}
                            onChange={handleInput}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            name="message"
                            rows={5}
                            required
                            placeholder="Write your message..."
                            value={contact.message}
                            onChange={handleInput}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition resize-none"
                        ></textarea>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300"
                    >
                        Send Message
                    </button>

                </form>
            </div>

        </div>
    );
};

