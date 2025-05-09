import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
      console.log(err.message);
    }
  };

  const handleSignup = async() => {
    try {
      const res = await axios.post(
        "http://localhost:5000/signUp",
        { email, password, firstName, lastName },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
      console.log(err.message);
    }
  }

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">
        {isLogin ? "Login" : "Sign up"}
      </legend>

      {!isLogin && 
        <>
          <label className="label">Firstname</label>
          <input
            type="text"
            className="input"
            placeholder="Firstname"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
          />

          <label className="label">Lastname</label>
          <input
            type="text"
            className="input"
            placeholder="Lastname"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
          />
        </>
      }
      <label className="label">Email</label>
      <input
        type="email"
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="label">Password</label>
      <input
        type="password"
        className="input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className="text-red-500">{error}</p>
      <button
        className="btn btn-neutral mt-4"
        onClick={isLogin ? handleLogin : handleSignup}
      >
        {isLogin ? "Login" : "Sign up"}
      </button>
      <p onClick={() => setLogin(!isLogin)}>{isLogin ? "New User ? SignUp" : "Existing User ? Login"}</p>
    </fieldset>
  );
};

export default Login;
