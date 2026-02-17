import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
//import "./Register.css";

export const AdminUpdate = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });

    const navigate = useNavigate();
    const params = useParams();
    console.log("Params single user: ", params);

    // Fetch single user data
    const getSingleUserData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/admin/users/${params.id}`,
                { withCredentials: true }
            );
            console.log("Single user data:", response.data);
            setData(response.data);
        } catch (error) {
            console.log("Fetch single user error:", error);
            toast.error("Failed to fetch user data!");
        }
    };

    useEffect(() => {
        getSingleUserData();
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/admin/users/update/${params.id}`,
                data,
                { withCredentials: true }
            );

            toast.success("Updated Successfully!");
            navigate("/admin/users");
        } catch (error) {
            console.log("Update user error:", error);
            toast.error(
                error.response?.data?.message || "Not Updated!"
            );
        }
    };

    return (
        <div className="register-div">
            <h1>Update User Data</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Name:</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    autoComplete="off"
                    value={data.username}
                    onChange={handleInput}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    required
                    autoComplete="off"
                    value={data.email}
                    onChange={handleInput}
                />

                <label htmlFor="phone">Phone:</label>
                <input
                    type="number"
                    name="phone"
                    id="phone"
                    required
                    autoComplete="off"
                    value={data.phone}
                    onChange={handleInput}
                />

                <br />
                <button type="submit">Update Now!</button>
            </form>
        </div>
    );
};
