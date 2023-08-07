import React, { useEffect } from "react";
import ToDoMain from "./Components/TodoMain/ToDoMain";
import { Routes, Route } from "react-router";
import About from "./Components/pages/About";
import Contact from "./Components/pages/Contact";
import ErrorPage from "./Components/pages/ErrorPage";
import Navbar from "./Components/Nav/Navbar";
import SingleTask from "./Components/pages/SingleTask";
import Loader from "./Components/Loader";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const status = useSelector(state => state.todo.status);
  const error = useSelector(state => state.todo.error);

  useEffect(() => {
    if (status) {
      toast.success(status, toastStyles);
    } else if (error) {
      toast.error(error, toastStyles);
    }
  }, [status, error]);
  return (
    <div>
      <Navbar />
      {isLoading && <Loader />}
      <Routes>
        <Route path="/" element={<ToDoMain />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/singletask/:taskId" element={<SingleTask />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}
