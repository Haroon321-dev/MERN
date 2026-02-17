import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
export const Navbar = () => {
    const { isLoggedIn, isLoading } = useAuth();
    //console.log("Navbar isLoggedIn:", isLoggedIn);
    console.log("Navbar isLoggedIn:", isLoggedIn, "isLoading:", isLoading);
    if (isLoading) return null;
    return (
        <>
            <header className="bg-white shadow-md p-3.5">
                <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">

                    {/* Logo */}
                    <NavLink
                        to="/"
                        className="text-2xl font-bold text-indigo-600 tracking-wide"
                    >
                        LOGO
                    </NavLink>

                    {/* Navigation */}
                    <nav>
                        <ul className="flex items-center gap-8 text-lg font-medium">
                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                                                    : "text-gray-700 hover:text-indigo-600 transition duration-300"
                                            }
                                        >
                                            HOME
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/about"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                                                    : "text-gray-700 hover:text-indigo-600 transition duration-300"
                                            }
                                        >
                                            ABOUT
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/services"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                                                    : "text-gray-700 hover:text-indigo-600 transition duration-300"
                                            }
                                        >
                                            SERVICES
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/contact"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                                                    : "text-gray-700 hover:text-indigo-600 transition duration-300"
                                            }
                                        >
                                            CONTACT
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/logout"
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                        >
                                            LOGOUT
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink
                                            to="/register"
                                            className="text-gray-700 hover:text-indigo-600 transition duration-300"
                                        >
                                            REGISTER
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/login"
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                                        >
                                            LOGIN
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>

                </div>
            </header>

        </>
    );
};



