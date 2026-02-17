import { BrowserRouter, Routes, Route } from "react-router-dom";
import  { Home } from "./pages/Home.jsx";
import { About } from "./pages/About.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Services } from "./pages/Services.jsx";
import { Register } from "./pages/Register.jsx";
import { Login } from "./pages/Login.jsx";
import { Logout } from "./pages/Logout.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { AdminLayout } from "./components/layouts/Admin-Layout.jsx";
import { AdminUsers } from "./pages/Admin-Users.jsx";
import { AdminContacts } from "./pages/Admin-Contacts.jsx";
import { AdminUpdate } from "./pages/Admin-Update.jsx";
// import { ForgotPassword } from "./pages/ForgotPassword.jsx";
// import { ResetPassword } from "./pages/ResetPassword.jsx";
import { ForgotPasswordOtp } from "./pages/ForgotPasswordOtp.jsx";
import { VerifyOtp } from "./pages/VerifyOtp.jsx";
import { FileUpload } from "./pages/FileUpload.jsx";
const App = () => {
  return(
  <>
    <BrowserRouter>
    <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />}/>
            <Route path="contact" element={<AdminContacts />}/>
            <Route path="users/:id/edit" element={<AdminUpdate />}/>
          </Route>
          {/* <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/reset-password/:token" element={<ResetPassword />}/> */}
          <Route path="/forgot-password-otp" element={<ForgotPasswordOtp />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </BrowserRouter>
  </>
  ); 
};

export default App;