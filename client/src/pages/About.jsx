import { NavLink } from "react-router-dom";

export const About = () => {
    return (
        <div className="min-h-screen bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 py-16 px-4">

            <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10 md:p-16">

                {/* Heading Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        About Us
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        We are dedicated to delivering high-quality digital solutions 
                        that empower businesses and individuals to grow, innovate, 
                        and succeed in today's competitive world.
                    </p>
                </div>

                {/* Content Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                            Who We Are
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Our team specializes in creating seamless digital experiences 
                            with modern technologies. We focus on performance, scalability, 
                            and clean design to ensure the best results for our clients.
                        </p>

                        <h2 className="text-2xl font-semibold text-purple-600 mb-4">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our mission is to provide innovative, reliable, and efficient 
                            services that help businesses reach their full potential. 
                            We believe in creativity, collaboration, and continuous improvement.
                        </p>
                    </div>

                    {/* Right Feature Cards */}
                    <div className="space-y-6">

                        <div className="p-6 rounded-2xl bg-indigo-50 shadow-md hover:shadow-xl transition duration-300">
                            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                              Innovation
                            </h3>
                            <p className="text-gray-600">
                                We embrace new technologies and creative strategies 
                                to build future-ready solutions.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-purple-50 shadow-md hover:shadow-xl transition duration-300">
                            <h3 className="text-lg font-semibold text-purple-700 mb-2">
                                Professionalism
                            </h3>
                            <p className="text-gray-600">
                                We maintain transparency, commitment, and excellence 
                                in every project we handle.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-pink-50 shadow-md hover:shadow-xl transition duration-300">
                            <h3 className="text-lg font-semibold text-pink-700 mb-2">
                                Client Focus
                            </h3>
                            <p className="text-gray-600">
                                Your success is our priority. We build long-term 
                                relationships based on trust and results.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Call To Action */}
                <div className="text-center mt-16">
                    <NavLink
                        to="/contact"
                        className="inline-block px-8 py-3 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300"
                    >
                        Contact Us
                    </NavLink>
                </div>

            </div>
        </div>
    );
};

