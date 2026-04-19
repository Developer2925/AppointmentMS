import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.25, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const App = () => {
  const location = useLocation();

  return (
    <>
      <div className="mx-4 sm:mx-[10%]">
        <ToastContainer />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/doctors" element={<PageWrapper><Doctors /></PageWrapper>} />
            <Route path="/doctors/:speciality" element={<PageWrapper><Doctors /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/my-profile" element={<PageWrapper><MyProfile /></PageWrapper>} />
            <Route path="/my-appointments" element={<PageWrapper><MyAppointments /></PageWrapper>} />
            <Route path="/appointment/:docId" element={<PageWrapper><Appointment /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  );
};

export default App;
