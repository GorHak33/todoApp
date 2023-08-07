import React, { useEffect } from "react";
import { BeatLoader } from "react-spinners";

const Loader = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <h1>Loading ... </h1>
      <BeatLoader color="#36D7B7" size={40} />
    </div>
  );
};

export default Loader;
