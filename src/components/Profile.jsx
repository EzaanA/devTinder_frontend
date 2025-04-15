import { useSelector } from "react-redux";
import EditProfile from "./EditProfile"


const Profile = () => {
      const user = useSelector((store)=>
         store.user
      )
      // console.log("user:")
      // console.log(user)
      if(!user){
        return <h1>No user found! Please Login</h1>
      }
  return (
    <>
      <EditProfile user = {user}/>
    </>
  )
}

export default Profile
