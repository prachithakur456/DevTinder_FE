import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import UserCard from './UserCard';
import EditProfile from './EditProfile';

const Profile = () => {
    const user = useSelector(store => store.user);
    console.log(user)

  return (
    <>
    {user && <EditProfile user={user}/>}
    {user && <UserCard user={user}/>}
    </>
  )
}

export default Profile