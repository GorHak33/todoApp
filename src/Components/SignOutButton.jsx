import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useNavigate } from "react-router-dom";
import { signOut } from "../Redux/SignInOutSlice/signInOutSlice";

export default function SignOutButton() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.signInOut.token);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch(signOut(token));
    navigate("/signin");
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
