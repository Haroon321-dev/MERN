// import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
// import "./Register.css";
// import "./Login.css";

// export const ResetPassword = () => {
//     const { token } = useParams();
//     const navigate = useNavigate();
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [visible, setVisible] = useState(true);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);

//             await axios.post(
//                 `http://localhost:5000/api/route/reset-password/${token}`,
//                 { password },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             toast.success("Password Reset Successfully!");
//             navigate("/login");

//         } catch (error) {
//             toast.error(
//                 error.response?.data?.message || "Reset Failed!"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <div className="register-div">
//                 <h2>Reset Password</h2>
//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor="password">New Password:</label>
//                     <input
//                         type={visible ? "text" : "password"}
//                         name="password"
//                         id="password"
//                         placeholder="Enter new Password!"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />

//                     <div
//                         className="hideShowforget"
//                         onClick={() => setVisible(!visible)}
//                     >
//                         {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//                     </div>
//                     <br />
//                     <button type="submit" disabled={loading}>
//                         {loading ? "Updating..." : "Reset Password"}
//                     </button>
//                 </form>
//             </div>
//         </>
//     );
// };
