import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <h2>
      ERROR 404 : not found
      <Link to={"/"}>Go back to Home page</Link>
    </h2>
  );
}
