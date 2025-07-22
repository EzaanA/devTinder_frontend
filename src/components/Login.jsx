import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login  = () => {

    const[email , setEmail] = useState("aditya@gmail.com");
    const[password , setPassword] = useState("Aditya@25");
    const[firstName , setFirstName] = useState("");
    const[lastName , setLastName] = useState("");
    const[isLogin , setIsLogin] = useState(true);
    const[error , setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlLogin = async()=>{
        try{
            const res = await  axios.post(BASE_URL+"/login" , {
                email ,
                password
            },
            {withCredentials : true}
        )
        // this will bring the user data from the backend & will store it in the store
            dispatch(addUser(res.data))
            return navigate("/")
        }
        catch(err){
            // navigate("/login");
            setError(err?.response?.data.error);
            // console.log(err?.response?.data);
        }
    }

    const handleSignUp=async()=>{
       try
        { 
            const res = await axios.post(BASE_URL+"/signup" , {firstName , lastName , email , password} ,{
            withCredentials : true
        })
        dispatch(addUser(res.data.data));
        return navigate("/profile");
    }
    catch(err){
        console.log(err);
    }
    }

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="card card-dash w-1/3 bg-base-300 mt-20">
                    <div className="card-body flex items-center">

                    {isLogin?<h2 className="card-title mb-4">Login</h2>:<h2 className="card-title mb-4">SignUp</h2>}


                    {!isLogin && 
                    <>
                        <label className="input validator w-3/4 flex flex-col justify-center border-gray-500">
                            <input
                                type="text"
                                placeholder="First Name"
                                required
                                onChange = {(e)=>{
                                    setFirstName(e.target.value)
                                }}
                            />
                        </label>

                        <label className="input validator w-3/4 flex flex-col justify-center border-gray-500">
                            <input
                                type="text"
                                placeholder="Last Name"
                                required
                                onChange = {(e)=>{
                                    setLastName(e.target.value)
                                }}
                            />
                        </label>
                        </>
                        }

                        
                        <label className="input validator w-3/4 flex flex-col justify-center border-gray-500">
                            <input
                                type="email"
                                placeholder="Enter your email ID"
                                required
                                onChange = {(e)=>{
                                    setEmail(e.target.value)
                                }}
                                value={email}
                            />
                        </label>
                        {/* className="border p-" */}

                        <div className="validator-hint hidden ">
                            Enter valid email address
                        </div>
                        <label className="input validator w-3/4 flex flex-col justify-center border-gray-500">
                        {/* <div>{password}</div> */}
                            <input
                                type="password"
                                required
                                placeholder="Enter Your Password"
                                // minlength="8"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                onChange={(e)=>{
                                    setPassword(e.target.value)
                                }}
                                value={password}
                            />
                        </label>
                        <p className="validator-hint hidden">
                            Must be more than 8 characters, including
                            <br />
                            At least one number
                            <br />
                            At least one lowercase letter
                            <br />
                            At least one uppercase letter
                        </p>


                       {isLogin?<p className="cursor-pointer mt-3" onClick={()=>{
                            setIsLogin(false)
                        }}>New User? Click here to Sign In</p> : 
                        <p className="cursor-pointer mt-3"
                        onClick={()=>{
                            setIsLogin(true)
                        }}
                        >Existing User? Click here </p>
                        }

                        <div className="card-actions justify-end">
                        {
                        error && <p className="text-red-500 mr-0">{error}!!</p>}
                        
                        {<button className="btn btn-primary mt-8"
                            onClick={isLogin ? handlLogin : handleSignUp}
                            >{isLogin ? "Login" : "SignUp"}</button> }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
