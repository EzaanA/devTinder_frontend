import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

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
                        devTinder
                    </Link>
                </div>
                <div className="flex gap-2">
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
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                            >
                                <li>
                                    <Link
                                        to="/profile"
                                        className="justify-between"
                                    >
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                    <li>
                                <Link to={"/connections"}>
                                        Friends
                                </Link>
                                    </li>
                                    <li>
                                <Link to={"/requests"}>
                                        Requests
                                </Link>
                                    </li>
                                <li>
                                    <a onClick={handleLogout}>Logout</a>
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
