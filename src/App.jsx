import { Route, Routes } from "react-router-dom";
import LoggedInPage from "./pages/LoggedInPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginPage/>}></Route>      
        <Route path="/logged-in" element={<LoggedInPage/>}></Route>      
      </Routes>
    </div>
  )
  
}
