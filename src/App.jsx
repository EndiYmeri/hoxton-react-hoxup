import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import LoggedInPage from "./pages/LoggedInPage";
import LoginPage from "./pages/LoginPage";

export default function App() {

  const [users, setUsers] = useState([])

  const [currentUser, setCurrentUser] = useState(null)

  

  useEffect(()=>{
      fetch("http://localhost:4000/users")
          .then(resp=> resp.json())
              .then(users => setUsers(users))

      },[])

  const navigate = useNavigate()
  
  function logIn (user) {
    localStorage.setItem("user",JSON.stringify(user))
    // set user in state as the current user
    setCurrentUser(user)
    // navigate to the main page


    navigate('/logged-in')
  }
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user) logIn(user)
  },[])

  function logOut () {
    localStorage.removeItem("user")
    setCurrentUser(null)
  }

  return (
    <div className="app">
      <Routes>
        <Route index element={<Navigate replace to='/login'/>} />
        <Route path="/login" element={<LoginPage users={users} logIn={logIn} />} />      
        <Route path="/logged-in" element={<LoggedInPage users={users} currentUser = {currentUser} logOut={logOut}/>} />      
        <Route path="/logged-in/:conversationId" element={<LoggedInPage users={users} currentUser = {currentUser} logOut={logOut} />} />      
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  )
  
}
