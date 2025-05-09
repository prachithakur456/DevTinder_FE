import React, {useState} from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import UserCard from './UserCard';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
    console.log(user)
    const [firstName, setFirstname] = useState(user.firstName);
    const [lastName, setLastname] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [desc, setDesc] = useState(user.desc);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const saveProfile = async() => {
        setError('')
        try{
            const res = await axios.patch('http://localhost:5000/profile/edit', {firstName, lastName, age, gender, photoUrl, desc}, {withCredentials: true});
            console.log(res.data);
            dispatch(addUser(res.data.data));
            // navigate('/');
        }catch(err){
          setError(err?.response?.data || 'Something went wrong!')
            console.log(err);
        }
    };

  return (
    <>
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">Edit Profile</legend>

      <label className="label">Firstname</label>
      <input type="text" className="input" placeholder="Firstname" value={firstName} onChange={(e) => setFirstname(e.target.value)}/>

      <label className="label">Password</label>
      <input type="text" className="input" placeholder="Lastname" value={lastName} onChange={(e) => setLastname(e.target.value)}/>
      <label className="label">Age</label>
      <input type="text" className="input" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}/>

      <label className="label">Gender</label>
      <input type="text" className="input" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)}/>
      <label className="label">PhotoUrl</label>
      <input type="text" className="input" placeholder="Photourl" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}/>

      <label className="label">About</label>
      <input type="text" className="input" placeholder="About" value={desc} onChange={(e) => setDesc(e.target.value)}/>
      <p className="text-red-500">{error}</p>
      <button className="btn btn-neutral mt-4" onClick={saveProfile}>Save</button>
    </fieldset>
    </>
  )
}

export default EditProfile