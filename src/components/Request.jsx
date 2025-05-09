import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, id) => {
    try {
      const url = `http://localhost:5000/request/review/${status}/${id}`;
      const res = await axios.post(
        url, {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/user/request/received",
        { withCredentials: true }
      );
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);
  console.log("request", requests);
  
  if (!requests) return;
  if (!requests.length) return <h1>No connection found</h1>;
  return (
    <div className="flex justify-center my-10">
      <h1 className="text-bold text-2xl">Connection</h1>
      {
        requests.map((request) => {
          const { firstName, photoUrl, age, gender, desc } = request.fromUserId || {};
          return(
          <div>
            <div>
              <img alt="photo" src={photoUrl} />
            </div>
            <div>
              <h3>{firstName}</h3>
              <p>{desc}</p>
            </div>
            <button onClick={() => reviewRequest('accepted', request._id)}>Accept</button>
            <button onClick={() => reviewRequest('rejected', request._id)}>Reject</button>
          </div>
        )})}
    </div>
  );
};

export default Request;
