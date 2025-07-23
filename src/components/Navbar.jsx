import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { GiTechnoHeart } from "react-icons/gi";
import { BsGearWideConnected } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { RiShutDownLine } from "react-icons/ri";





const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


    const user = useSelector(
        (store) =>
            // console.log(store)
            store.user
    );
    // console.log(user)

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {},{
              withCredentials:true
            });
            dispatch(removeUser());
            return navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">
                        👨🏻‍💻devTinder
                    </Link>
                </div>
                <div className="flex gap-2">
                    {/* <button>Search</button> */}
                    {user && (
                        <div className="dropdown dropdown-end mx-5">
                            <div className="flex items-center">
                                <p className="mx-5">Welcome {user.firstName}</p>
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="profile pic"
                                            src={user.photoURL}
                                        />
                                    </div>
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow absolute opacity-55"
                            >
                                <li>
                                    <Link
                                        to="/profile"
                                        className="justify-between"
                                    >
                                        Profile
                                        <span className="badge"><BsGearWideConnected />
                                        </span>
                                    </Link>
                                </li>
                                    <li>
                                <Link 
                                className="justify-between"
                                to={"/connections"}>
                                        Friends
                                        <span className="badge"><GiTechnoHeart /> </span>

                                </Link>
                                    </li>
                                    <li>
                                <Link to={"/requests"}>
                                        Requests
                                        <span className="badge"><FaUserFriends /> </span>
                                </Link>
                                    </li>
                                <li>
                                    <Link                                 
                                    className="justify-between"
                                    onClick={handleLogout}>
                                        Logout
                                        <span className="badge">
                                        <RiShutDownLine/>
                                            </span>
                                        </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
