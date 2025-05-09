import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const res = await axios.get("http://localhost:5000/feed?page=1", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!feedData) {
      getFeed();
    }
  }, []);

  console.log("feed", feedData);
  if(!feedData) return;
  if(!feedData.length) return <h1>No more connections!</h1>
  return <UserCard user={feedData[0]} />;
};

export default Feed;
