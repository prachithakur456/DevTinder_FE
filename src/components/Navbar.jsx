import React, { useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Dev Tinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <p>Welcome, {user.firstName}</p>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/request">Connection Request</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
