import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToDoMain from "./Components/TodoMain/ToDoMain";
import About from "./Components/pages/About";
import Contact from "./Components/pages/Contact";
import ErrorPage from "./Components/pages/ErrorPage";
import Navbar from "./Components/Nav/Navbar";
import SingleTask from "./Components/pages/SingleTask";
import Loader from "./Components/Loader";
import Registration from "./Components/pages/Registration";
import SignInPage from "./Components/pages/SignIn";

const toastStyles = {
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export default function App() {
  const isLoading = useSelector(
    state => state.todo.pendingStatus === "pending"
  );
  const isAuthenticated =
    useSelector(state => state.signInOut.token !== null) ||
    localStorage.getItem("token");
  const status = useSelector(state => state.todo.status);
  const error = useSelector(state => state.todo.error);

  useEffect(() => {
    if (status) {
      toast.success(status, toastStyles);
    } else if (error) {
      toast.error(error, toastStyles);
    }
  }, [status, error]);

  if (!isAuthenticated) {
    <Navigate to={"/signin"} replace={true} />;
  }

  return (
    <div>
      {isLoading && <Loader />}
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/" element={<ToDoMain />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/singletask/:taskId" element={<SingleTask />} />
            {/* <Route path="/signout" element={<SignOutButton />} /> */}
          </>
        ) : (
          // Redirect to signin if not authenticated
          <Route path="*" element={<Navigate to="/signin" replace={true} />} />
        )}

        {/* Error Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}
