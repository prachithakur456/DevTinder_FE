import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
// import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
   
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/profile/view", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addUser(res.data));
    } catch (err) {
      navigate("/login");
      console.log(err.message);
    }
  };

  useEffect(() => {
    if(!user){
      fetchUser()
    }
  },[]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
