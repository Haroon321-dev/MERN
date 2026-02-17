import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
export const Home = () => {
    const { user } = useAuth();
    return (
        <>
            <div className="min-h-screen bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">

                {/* Hero Card */}
                <div className="text-center max-w-4xl bg-white p-12 rounded-3xl shadow-2xl">

                    {/* Welcome Text */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {user ? `Welcome, ${user.username}!` : `Welcome to Our Website`}
                    </h1>

                    {/* Hero Description */}
                    <p className="text-lg md:text-xl text-gray-700 mb-8">
                        Explore amazing features, seamless experiences, and the tools you need to take your projects to the next level.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">

                        <NavLink
                            to="/about"
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition duration-300"
                        >
                            Learn More
                        </NavLink>

                        <NavLink
                            to="/services"
                            className="px-6 py-3 bg-gray-100 text-indigo-600 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition duration-300"
                        >
                            Our Services
                        </NavLink>
                    </div>

                </div>

            </div>
        </>
    );
}