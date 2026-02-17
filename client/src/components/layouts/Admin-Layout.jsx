import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500">
                <h1 className="text-2xl font-semibold text-white animate-pulse">
                    Loading Admin Panel...
                </h1>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.isAdmin !== true) {
        return <Navigate to="/" />;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            {/* Admin Navbar */}
            <header className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="flex justify-between items-center h-16">

                        {/* Logo */}
                        <h2 className="text-white text-xl font-bold">
                            Admin Panel
                        </h2>

                        {/* Nav Links */}
                        <nav className="flex items-center gap-6">

                            <NavLink
                                to="/admin/users"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                                        isActive
                                            ? "bg-white text-indigo-600 font-semibold"
                                            : "text-white hover:bg-white/20"
                                    }`
                                }
                            >
                                <FaUser />
                                Users
                            </NavLink>

                            <NavLink
                                to="/admin/contact"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                                        isActive
                                            ? "bg-white text-purple-600 font-semibold"
                                            : "text-white hover:bg-white/20"
                                    }`
                                }
                            >
                                <MdContactMail />
                                Contacts
                            </NavLink>

                            <NavLink
                                to="/services"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                                        isActive
                                            ? "bg-white text-pink-600 font-semibold"
                                            : "text-white hover:bg-white/20"
                                    }`
                                }
                            >
                                <FaRegListAlt />
                                Services
                            </NavLink>

                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                                        isActive
                                            ? "bg-white text-indigo-600 font-semibold"
                                            : "text-white hover:bg-white/20"
                                    }`
                                }
                            >
                                <FaHome />
                                Home
                            </NavLink>

                        </nav>
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <Outlet />
                </div>
            </main>

        </div>
    );
};
