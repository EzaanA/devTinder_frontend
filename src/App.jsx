import Base from "./components/Base"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import Chat from "./components/Chat"

// theres a bug in the app which is in redux feedSlice so when we login from another account hamey pichley user ki feed hi dikh rahi hoti h cuz hamari slice abhi update nhi hui h uske liye hamey reload krna pdta h then it works... so resolve it

function App() {
  return (
    <>
  <Provider store={appStore}>
    <BrowserRouter basename = "/">
      <Routes>
        <Route path = "/" element={<Base/>}>
          <Route path = "/" element={<Feed/>}/>
          <Route path = "/login" element={<Login/>}/>
          <Route path = "/profile" element={<Profile/>}/>
          <Route path = "/connections" element={<Connections/>}/>
          <Route path = "/requests" element={<Requests/>}/>
          <Route path = "/chat/:targetUserId" element={<Chat/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
    </>
  )
}

export default App
