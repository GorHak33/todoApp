import React from "react";
import ToDoMain from "./Components/ToDoMain";
import { Routes, Route } from "react-router";
import About from "./Components/pages/About";
import Contact from "./Components/pages/Contact";
import ErrorPage from "./Components/pages/ErrorPage";
import Navbar from "./Components/Navbar";
import SingleTask from "./Components/pages/SingleTask";
import Count from "./Redux/countSlice/Count";

export default function App() {
  return (
    <div>
      {/* <Count /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<ToDoMain />} />
        <Route path="/about" element={<Count />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/singletask/:taskId" element={<SingleTask />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
