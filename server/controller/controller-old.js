
// import User from "../models/user-model.js";
// import sendEmail from "../utils/sendEmail.js";
// import validatePassword from "../validators/passwordValidator.js";
// import crypto from "crypto";
// import bcrypt from "bcryptjs";

// /*-------------------- Home Controller ------------------------*/

// const home = async (req, res) => {
//     try {
//         res.status(200).send("Welcome to Home Page!");
//     } catch (error) {
//         console.error(error);
//     }
// };

// /*-------------------- Register Controller --------------------*/

// const register = async (req, res) => {
//     try {
//         const { username, email, phone, password } = req.body;

//         const userExist = await User.findOne({ email });
//         if (userExist) {
//             return res.status(400).json({ message: "Email already exist!" });
//         }

//         const userCreated = await User.create({
//             username,
//             email,
//             phone,
//             password,
//         });

//         const token = await userCreated.generateToken();

//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             maxAge: 24 * 60 * 60 * 1000,
//         });

//         res.status(201).json({
//             message: "User Registered Successfully!",
//             userId: userCreated._id.toString(),
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error!" });
//     }
// };

// /*-------------------------- Login Controller -----------------------*/

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const userExist = await User.findOne({ email });
//         if (!userExist) {
//             return res.status(400).json({ message: "Invalid Credentials!" });
//         }

//         const isMatch = await bcrypt.compare(password, userExist.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid Email or Password!" });
//         }

//         const token = await userExist.generateToken();

//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             maxAge: 24 * 60 * 60 * 1000,
//         });

//         res.status(200).json({
//             message: "Login Successful!",
//             userId: userExist._id.toString(),
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error!" });
//     }
// };

// /*----------------------- Logout Controller ------------------------*/

// const logout = async (req, res) => {
//     try {
//         res.clearCookie("token", {
//             httpOnly: true,
//             sameSite: "strict",
//             secure: process.env.NODE_ENV === "production",
//         });

//         res.status(200).json({ message: "Logout successful" });
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// /*-------------------------- User Controller -------------------------*/

// const user = async (req, res) => {
//     try {
//         const userData = req.user;
//         res.status(200).json({ userData });
//     } catch (error) {
//         console.error(`User route error: ${error}`);
//     }
// };

// /*--------------- Forgot Password Controller ----------------*/

// const forgotPassword = async (req, res) => {
//     try {
//         const { email } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const resetToken = crypto.randomBytes(32).toString("hex");

//         user.resetPasswordToken = resetToken;
//         user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
//         await user.save();

//         const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

//         await sendEmail({
//             to: user.email,
//             subject: "Reset Your Password",
//             html: `
//                 <div style="font-family: Arial; max-width:600px; margin:auto;">
//                     <h2>Password Reset</h2>
//                     <p>Click the link below to reset your password:</p>
//                     <a href="${resetLink}">Reset Password</a>
//                     <p>This link will expire in 15 minutes.</p>
//                 </div>
//             `,
//         });

//         res.json({ message: "Password reset email sent" });

//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// /*--------------------- Reset Password Controller --------------------------*/

// const resetPassword = async (req, res) => {
//     try {
//         const { token } = req.params;
//         const { password } = req.body;

//         const user = await User.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpires: { $gt: Date.now() },
//         });

//         if (!user) {
//             return res.status(400).json({ message: "Invalid or expired token" });
//         }

//         user.password = password;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;

//         await user.save();

//         res.json({ message: "Password reset successful" });

//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// /*-------------------- Reset Password Validator Controller ----------------------*/

// const resetPasswordController = async (req, res) => {
//     try {
//         const { token } = req.params;
//         const { password } = req.body;

//         const validationError = validatePassword(password);
//         if (validationError) {
//             return res.status(400).json({ message: validationError });
//         }

//         const user = await User.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpires: { $gt: Date.now() },
//         });

//         if (!user) {
//             return res.status(400).json({
//                 message: "Invalid or expired reset token",
//             });
//         }

//         user.password = password;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;

//         await user.save();

//         res.status(200).json({ message: "Password reset successful" });

//     } catch (error) {
//         console.error("Reset password error:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// /*-------------------- EXPORTS (ESM) ----------------------*/

// export {
//     home,
//     register,
//     login,
//     logout,
//     user,
//     forgotPassword,
//     resetPassword,
//     resetPasswordController,
// };
