import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'
import Search from './Search'


const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => {
    // console.log("FULL STORE:", store);
    return store.feed;
  });

  // console.log(feed);

  const getFeed = async()=>{
    if(feed){
      return;
    }
    try{
      const res = await axios.get(BASE_URL+"/feed",{
        withCredentials : true
      });
      // console.log(res?.data?.userFeed);
      dispatch(addFeed(res?.data?.userFeed));
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
      getFeed();
  },[]);

  if(!feed){
    return
  }

  if(feed.length <= 0){
    return <div className='flex justify-center items-center mt-56'>⚠️ No new users found </div>
  }
  // feedData();
  return (
    <>
    <div className='flex justify-around pt-9'>

    {/* <div className="collapse collapse-arrow bg-base-100 border border-base-300"> */}
        <Search/>
        {/* </div> */}


        <UserCard key={feed[0]._id} user = {feed[0]}/>
        
    </div>
    </>
    )

}

export default Feed;
