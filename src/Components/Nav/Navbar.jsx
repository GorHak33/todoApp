import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";

import { signOut } from "../../Redux/SignInOutSlice/signInOutSlice";

export default function Navbar() {
  const isAuthenticated = localStorage.getItem("token");
  const token = useSelector(state => state.signInOut.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut(token));
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <header>
      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/">Task</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <button onClick={handleSignOut}>Sign out</button>
            </>
          ) : (
            <li>
              <NavLink to="/signin">Sign In</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
