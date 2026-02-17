import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Pencil, Trash2, Users } from "lucide-react";

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const getAllUsersData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/admin/users",
                { withCredentials: true }
            );
            setUsers(response.data);
        } catch (error) {
            toast.error("Failed to fetch users!");
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/admin/users/delete/${id}`,
                { withCredentials: true }
            );

            toast.success("User deleted successfully!");
            getAllUsersData();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to delete user!"
            );
        }
    };

    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <div className="w-full">

            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Users className="w-7 h-7 text-indigo-600" />
                    <h2 className="text-2xl font-bold text-gray-800">
                        Manage Users
                    </h2>
                </div>

                <span className="text-sm text-gray-500">
                    Total Users: {users.length}
                </span>
            </div>

            {/* Table Wrapper */}
            <div className="overflow-hidden border border-gray-200 rounded-xl">

                <table className="min-w-full text-sm text-left">

                    {/* Head */}
                    <thead className="bg-gray-50 border-b">
                        <tr className="text-gray-600 uppercase text-xs tracking-wider">
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody className="divide-y divide-gray-100">

                        {users.length > 0 ? (
                            users.map((curUser, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 transition duration-200"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {curUser.username}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {curUser.email}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {curUser.phone || "—"}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-3">

                                            <Link
                                                to={`/admin/users/${curUser._id}/edit`}
                                                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
                                            >
                                                <Pencil className="w-4 h-4" />
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    deleteUser(curUser._id)
                                                }
                                                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="px-6 py-10 text-center text-gray-500"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>

        </div>
    );
};
