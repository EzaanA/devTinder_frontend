import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Requests = () => {
  const dispatch  = useDispatch();
  // const[clicked , setClicked] = useState(true); so if youre thinking of doing it this way then its wrong bcz it'll hide all the cards not just the accepted or the rejected one

  const requestData = useSelector((store)=>{
    // console.log(store.request)
    return store.request;
  })
 

  const handleRequestConnection = async(status ,_id) => {
    try{
      const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id ,{},
        {
        withCredentials : true
      })
      dispatch(removeRequest(_id));
    }
    catch(err){
      console.log(err)
    }
  }
  
  const userRequests = async() => {
    try{
      const res = await axios.get(BASE_URL+"/user/requests" , {
        withCredentials :true
      })
      // console.log(res);
      dispatch(addRequest(res?.data?.data));
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    userRequests()
  },[]);

  if(requestData && requestData.length === 0){
    return <div className='flex justify-center mt-10 text-lg'> No pending Requests </div> 
  }

  return (
    <>
        <h1 className="font-bold text-4xl text-center text-secondary mb-6">Pending Requests</h1>
    <div className='grid grid-cols-2 gap-6 justify-items-center mt-8'>
    {requestData.map((e)=>(
      <div
        key={e._id}
        className="flex flex-row items-center w-full max-w-md p-4 rounded-lg shadow-md bg-slate-950"
      >
        <img
          alt="dp"
          className="h-32 w-32 object-cover border border-black rounded-full mr-4"
          src={e?.fromUserId?.photoURL}
        />
        <div>
          <p className="font-semibold text-2xl">{e?.fromUserId?.firstName + " " + e?.fromUserId?.lastName}</p>
          <p>{e?.fromUserId?.age} , {e?.fromUserId?.gender}</p>
          <p className="overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
            {e?.fromUserId?.about}
          </p>

         <div className='flex justify-between mt-5'>
            <button className='bg-secondary font-bold text-blue-950 h-10 w-24 rounded-lg'
            onClick={()=>handleRequestConnection('accepted',e._id) 
            }>Accept</button>
            <button className='bg-primary font-bold text-blue-950 h-10 w-24 ml-5 rounded-lg'
            onClick={()=> handleRequestConnection('rejected',e._id)}
            >Reject</button>
          </div>


        </div>
      </div>
    ))
      }
    </div>
    </>
  )
}

export default Requests
