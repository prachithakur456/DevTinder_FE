import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
      console.log(res.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  console.log("connection", connections);

  if (!connections) return;
  if (!connections.length) return <h1>No connection found</h1>;
  return (
    <div className="flex justify-center my-10">
      <h1 className="text-bold text-2xl">Connection</h1>
      {connections &&
        connections.map(({ firstName, photoUrl, age, gender, desc }) => (
          <div>
            <div>
              <img alt="photo" src={photoUrl} />
            </div>
            <div>
              <h3>{firstName}</h3>
              <p>{desc}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Connection;
