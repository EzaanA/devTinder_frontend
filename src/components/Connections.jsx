import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import UserCard from './UserCard';

const Connections = () => {
    const[connections , setConnection] = useState([]);
    const fetchConnections = async()=>{
        try{
          const res = await axios.get(BASE_URL+"/user/connections" , {
              withCredentials : true
            })
            setConnection(res?.data?.data);
        }
        catch(err){
          console.log(err);
        }
  }

  useEffect(()=>{
    fetchConnections();
  },[]);
  return (  
    <>
  <h1 className="font-bold text-4xl text-center text-secondary mb-6">Connections</h1>

  <div className="grid grid-cols-2 gap-6 justify-items-center">
    {connections.map((e) => (
      <div
        key={e._id}
        className="flex flex-row items-center w-full max-w-md p-4 bg-slate-950 rounded-lg shadow-md"
      >
        <img
          alt="dp"
          className="h-32 w-32 object-cover border border-black rounded-full mr-4"
          src={e.photoURL}
        />
        <div>
          <p className="font-semibold text-2xl">{e.firstName + " " + e.lastName}</p>
          <p>{e.age} , {e.gender}</p>
          <p className="overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
            {e.about}
          </p>
        </div>
      </div>
    ))}
  </div>
</>

  )
}

export default Connections
