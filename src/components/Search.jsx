import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addSearchFeed } from "../utils/searchSlice";

const Search = () => {
    const dispatch = useDispatch();
    const [searchUsers , setSearchUsers] = useState([]);
    const [query , setQuery] = useState("");
    const [warning , setWarning] = useState(null);
    const [isMac, setIsMac] = useState(false);

    const searchFeed = useSelector((store)=>{
        return store.searchFeed;
    });

    useEffect(() => {

        // const getIsMac = () => {
        //     if (navigator.userAgentData) {
        //       // Modern browsers
        //       return navigator.userAgentData.platform.toLowerCase().includes('mac');
        //     } else {
        //       // Fallback for older browsers
        //       return /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
        //     }
        //   };

        const handleShortcut = (e) => {
          const isMac = true;
          const isCmdOrCtrlK = (isMac && e.metaKey && e.key === "k") || (!isMac && e.ctrlKey && e.key === "k");
      
          if (isCmdOrCtrlK) {
            e.preventDefault();
            const input = document.getElementById("searchInput");
            if (input) {
              input.focus();
            }
          }
        };
      
        document.addEventListener("keydown", handleShortcut);
        return () => {
          document.removeEventListener("keydown", handleShortcut);
        };
      }, []);


    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const sUsers = await axios.get(BASE_URL+"/searchFeed",{
                    withCredentials : true
                });

                dispatch(addSearchFeed(sUsers?.data?.userFeed));
            }
            catch(err){
                console.log(err);
            }
        }
        fetchData();
    } , [dispatch])


    useEffect(()=>{

        const sfeed = setTimeout(()=>{
            if(!searchFeed ){
                setSearchUsers([]);
                return ;
            }
            if(!query){
                // setWarning("⚠️ enter username");
                setSearchUsers([]);
                return;
            }
            else if(query.trim().length==0){
                setWarning("⚠️ please remove spaces ");
                return;
            }

            const newfeed = searchFeed.filter((el)=>{
                const name = (el.firstName + el.lastName).toLowerCase().trim();
                return name.includes(query.toLowerCase().trim());
            })
                setWarning(null);
                // console.log(newfeed);
            if(newfeed.length < 1){
                setWarning("⚠️ This user does'nt exist \n or \n might be in Your Friend List ");
                // console.log("hello");
                setSearchUsers([]);
                return ;
            }

            // console.log(newfeed);
            setSearchUsers(newfeed)
            return newfeed;

        } ,500);
        // console.log(sfeed);
        return () => clearTimeout(sfeed);

    } , [query, dispatch]);


    
    // const handleSearch = async(e)=>{
    //     try{
    //         const sUsers = await axios.get(BASE_URL+"/searchFeed",{
    //             withCredentials : true
    //         });
    //         // console.log(sUsers?.data?.userFeed);
    //         dispatch(addSearchFeed(sUsers?.data?.userFeed));
    //         // console.log(searchFeed);
    //         if(!searchFeed){
    //             return;
    //         }
    //         // console.log(e.target.value);
    //         setTimeout(()=>{
    //             const newFeed = searchFeed.filter((user)=>{
    //             const name = (user.firstName).toLowerCase();
    //             return name.includes((e.target.value).toLowerCase())
    //         })
    //             // console.log(newFeed);
    //             setSearchUsers(newFeed);
    //         } ,1000)
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // }



    return (
        <div className="w-1/3 border flex items-center flex-col">
            <h1 className="text-2xl my-12">Search Geek</h1>
            {/* <div className=' border '> */}
            {/* <input type='search' className="border w-1/3" /> */}
            {/* <div className=""> */}

            <label className="input flex justify-center items-center ">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    id="searchInput"
                    type="search"
                    className="grow p-7"
                    placeholder="Search"
                    onChange={(e) => setQuery(e.target.value)}
                    />
                <kbd className="kbd kbd-sm">{isMac ? "⌘" : "Ctrl"}</kbd>
                <kbd className="kbd kbd-sm">K</kbd>
            </label>
            {searchUsers
                 ?
            <div className="w-[90%] mt-5 max-h-[35rem] overflow-y-auto">
                {searchUsers.map((e)=>(
                    <div key={e._id} 
                    className="flex flex-row pr-5 w-full items-center my-3 bg-[#5A7EA6] rounded-xl ">
                        <img src={e.photoURL} alt="profPic" className="rounded-full h-20 mx-9 my-2"/>
                        <div className=" flex flex-row justify-between w-full items-center">
                        <div className="text-primary-content ">
                            <div>
                                <span className="font-bold">
                                {e .firstName +" "+ e.lastName}
                                </span>
                            </div>
                            <div>
                                <span>{e.age} | {e.gender}</span>
                            </div>
                            <div>
                                <span className="line-clamp-2">{e.about}</span>
                            </div>
                        </div>
                        <button className="btn-dash bg-pink-300 text-slate-800 font-bold rounded-md p-1">Add</button>
                        </div>
                        {/* <button class="btn btn-dash btn-primary">Primary</button> */}
                    </div>
                ))}
            </div>
            :
            <div>Search here</div>
            }
            {
            (!query ||searchUsers.length<1) &&
            <div className="text-center whitespace-pre-line text-error">{warning}</div>
            }
                        {/* </div> */}
            {/* </div> */}
        </div>
    )
}

export default Search