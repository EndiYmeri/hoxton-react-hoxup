import { Navigate, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import LoggedInPage from "./pages/LoggedInPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route index element={<Navigate replace to='/login'/>} />
        <Route path="/login" element={<LoginPage/>} />      
        <Route path="/logged-in" element={<LoggedInPage/>} />      
        <Route path="/logged-in/:conversationId" element={<LoggedInPage/>} />      
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  )
  
}
