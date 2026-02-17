// import { useState } from "react";
// import "./Register.css";
// import { toast } from "react-toastify";
// import axios from "axios";

// export const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!email) {
//             toast.error("Email is required!");
//             return;
//         }

//         try {
//             setLoading(true);

//             await axios.post(
//                 "http://localhost:5000/api/route/forgot-password",
//                 { email },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             toast.success("Password reset link sent to your Email!");
//             setEmail("");

//         } catch (error) {
//             toast.error(
//                 error.response?.data?.message || "Server error, Try again later!"
//             );
//             console.log("Forgot Password Error:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="register-div">
//             <h2>Forgot Password?</h2>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="email">Email:</label>
//                 <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     placeholder="Enter your Email!"
//                     required
//                     autoComplete="off"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <br />
//                 <button type="submit" disabled={loading}>
//                     {loading ? "Sending..." : "Submit"}
//                 </button>
//             </form>
//         </div>
//     );
// };








