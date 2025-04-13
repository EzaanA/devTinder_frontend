import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login  = () => {

    const[email , setEmail] = useState("aditya@gmail.com");
    const[password , setPassword] = useState("Aditya@25");
    const[error , setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlLogin = async()=>{
        try{
            const res = await axios.post(BASE_URL+"/login" , {
                email ,
                password
            },
            // console.log(res);
            {withCredentials : true}
        )
        // console.log(res)
        // this will bring the user data from the backend & will store it in the store
        // window.location.href = "/";
        dispatch(addUser(res.data))
        // setTimeout(()=>{
            return navigate("/")
        // },10000);
        }
        catch(err){
            // navigate("/login");
            setError(err?.response?.data.error);
            console.log(err?.response?.data);
        }
    }

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="card card-dash w-1/3 bg-base-300 mt-20">
                    <div className="card-body flex items-center">
                        <h2 className="card-title mb-4">Login</h2>
                        <label className="input validator w-3/4 flex flex-col justify-center border-gray-500">
                        {/* <div>{email}</div> */}
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
                        <div className="card-actions justify-end">
                        {
                        error && <p className="text-red-500 mr-0">{error}!!</p>}
                        
                            <button className="btn btn-primary mt-8"
                            onClick={handlLogin}
                            >Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
