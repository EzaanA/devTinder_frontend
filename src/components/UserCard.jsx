import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeFeed } from '../utils/feedSlice'

const UserCard = ({user}) => {
  // console.log("hellp"+ {user})
  const{_id , firstName , lastName , age, gender, skills, photoURL, about} = user

  const dispatch = useDispatch();

  const handleSendRequest = async(status , _id)=>{
    try{
      const res = await axios.post(BASE_URL+"/request/send/"+ status + "/" + _id  , {} , {
        withCredentials : true
      })
      dispatch(removeFeed(_id));
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={photoURL}
      alt="Profile pic" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    <p>{age + " " +gender}</p>
    <p>{about}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary"
      onClick={()=>(handleSendRequest("ignored" , _id))}
      >Ignore</button>
      <button className="btn btn-secondary"
      onClick={()=>(
        handleSendRequest("interested" , _id)
      )}
      >Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard
