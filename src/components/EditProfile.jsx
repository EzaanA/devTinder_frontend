import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';


const EditProfile = ({user}) => {

    //gender a dropdown 
    //toast 
    // about textarea(in daisyui youll find it )  
    //css of profile page
    
    // // const {firstName,lastName,age,gender,about } = user;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[firstName , setFirstName] = useState(user.firstName);
    const[lastName , setLastName] = useState(user.lastName);
    const[age , setAge] = useState(user.age|| "");
    const[gender , setGender] = useState(user.gender || "");
    const[skills , setSkills] = useState(user.skills || "");
    const[photoURL, setPhotoURL] = useState(user.photoURL);
    const[about , setAbout] = useState(user.about || "" );
    const[error , setError] = useState("");
    // const dispatch = useDispatch();

    const handlSetProfile = async()=>{


        try{
            const res = await axios.patch(BASE_URL+"/profile/edit" , {
                firstName,
                lastName,
                age,
                gender,
                skills,
                photoURL,
                about
            },{
                withCredentials:true
            })
            // dispatch(add)
            // console.log("res")
            // console.log(res?.data?.data);

            dispatch(addUser(res?.data?.data));
            
            navigate("/");

        }
        catch(err){
            setError(err.response.data)
            console.log(error)
        }
    }
    // const{firstName} = user;
        // const[error , setError] = useState(null);
  return (
    <div className='flex justify-around items-center gap-'>
         {/* <div className=""> */}
                <div className=" w-[30%] bg-base-300 mt-20 rounded-2xl">
                    <div className="card-body flex items-center">
                        <h2 className="card-title mb-4">Edit Info</h2>
                        <div className='w-full'>
                        <p>FirstName:</p>
                        <label className="input validator w-full flex flex-col justify-center ">
                        {/* <div>{email}</div> */}
                            <input
                                type="text"
                                defaultValue={firstName}
                                onChange = {(e)=>{
                                    setFirstName(e.target.value)
                                }}
                            />
                        </label>
                        </div>
                        <div className='w-full'>
                        <p>LastName:</p>
                        <label className="input validator w-full flex flex-col justify-center">
                            <input
                                type="text"
                                onChange={(e)=>{
                                    setLastName(e.target.value)
                                }}
                                value={lastName}
                            />
                        </label>
                        </div>
                        
                        <div className='w-full'>
                        <p>age:</p>
                        <label className="input validator w-full flex flex-col justify-center">
                            <input
                                type="number"
                                onChange={(e)=>{
                                    setAge(e.target.value)
                                }}
                                value={age}
                            />
                        </label>
                        </div>

                        <div className='w-full'>
                        <p>Gender:</p>
                        <select 
                        className='input w-full'
                                onChange={(e)=>{
                                    setGender(e.target.value)
                                }}
                        >
                            <option value="male" >male</option>
                            <option value={"female"}>female</option>
                            <option value={"others"}>others</option>
                        </select>

                        {/* <label className="input validator w-3/4 flex flex-col justify-center border-gray-500">
                            <input
                                type="text"
                                onChange={(e)=>{
                                    setGender(e.target.value)
                                }}
                                value={gender}
                            />
                        </label> */}
                        </div>

                        <div className='w-full'>
                        <p>PhotoURL:</p>
                        <label className="input validator w-full flex flex-col justify-center ">
                            <input
                                type="text"
                                onChange={(e)=>{
                                    setPhotoURL(e.target.value)
                                }}
                                value={photoURL}
                            />
                        </label>
                        </div>

                        <div className='w-full'>
  <p>About:</p>
  <label className=" validator w-full flex flex-col justify-center">
    <textarea
      className="textarea textarea-bordered w-full h-40 resize-none"
      onChange={(e) => {
        setAbout(e.target.value);
      }}
      value={about}
      placeholder="Write something about yourself..."
    />
  </label>
</div>

                        {/* <div>
                        <p>Skills:</p>
                           {skills.map((e) => {
                            {console.log(e)}
                            <div className='flex '>
                            <div className="badge badge-accent">{e}</div>
                            </div>
                           })}
                        </div> */}


                        
                        <div className="card-actions justify-end">
                        </div>
                        { error && <p className="text-red-500 mr-0">{error}!!</p> }
                            <button className="btn btn-primary mt-8"
                            onClick={handlSetProfile}
                            >Set Profile</button>
                    </div>
                </div>
            {/* </div> */}

        <UserCard user={{firstName , lastName , age , gender , skills , photoURL , about}}/>
    </div>
  )
}

export default EditProfile
