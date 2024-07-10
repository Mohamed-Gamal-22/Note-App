import React from "react";
import not from "../../Assets/images/6325257.jpg";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100 ">
      <img src={not} alt="not found" className="w-25 mb-3" />
      <Link className="btn bg-info" to="/">Go Home</Link>
    </div>
  );
}
