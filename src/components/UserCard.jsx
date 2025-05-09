import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import axios from "axios";

const UserCard = ({user}) => {
//   const feed = useSelector((store) => store.feed);
const dispatch = useDispatch();
const handleRequest = async (status, id) => {
  try {
    const url = `http://localhost:5000/request/send/${status}/${id}`;
    const res = await axios.post(
      url, {},
      { withCredentials: true }
    );
    dispatch(removeFeed(id));
  } catch (err) {
    console.log(err.message);
  }
};

  if(!user) return <></>;
//   return feed.data.map((item) => {
  console.log(user.photoUrl);
    return (
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={user.photoUrl}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{user.firstName}</h2>
          <p>{user.age}, {user.gender}</p>
          <p>
            {user.desc}
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => handleRequest('interested', user._id)}>Interested</button>
            <button className="btn btn-primary" onClick={() => handleRequest('ignored', user._id)}>Ignore</button>
          </div>
        </div>
      </div>
    );
//   });
};

export default UserCard;
