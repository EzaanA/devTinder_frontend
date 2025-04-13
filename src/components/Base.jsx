import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"


const Base = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>{
    store.user
  })
  const fetchUser = async () =>{
    //so whats happening here is that when a user logs in his token is stored in cookies but when we would reload the app, the ui will get refreshed so as to counter it we fetched the data & then put it inside the useEffect hook as it will atleast render once & we've not given any dev dependencies so it will only be rendered once & the ui won't reset again on relaod as there will always be a user in the redux toolkit until logout 

    //& as the token is taken out thus it'll mean logout
    // if(!userData){
    //   return;
    // }
    try{
      const res = await axios.get(BASE_URL+"/profile/view", {
        withCredentials:true,
      });
      dispatch(addUser(res.data));
      }
      catch(err){
        if(err.status === 401){
          navigate("/login");
        }
        console.error(err);
      }
    };

    useEffect(()=>{
      fetchUser();
    },[])

  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Base
