import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import H3ButtonTitle from "../components/H3ButtonTitle"
import UserLoginItem from "../components/UserLoginItem"

function LoginPage({users, logIn}){

    if(users){
        return <>
            <div className="main-wrapper login">

                    <section className="login-section">
                        <h2>Choose your user!</h2>
                        <ul>
                        {
                            users.map(user =>{
                                return <UserLoginItem user = {user} logIn = {logIn} />
                            })
                        }
                            <li>
                                <button className="user-selection">
                                    <H3ButtonTitle title={"+ Add new user"}/>
                                </button>
                            </li>
                        </ul>
                    </section>
            </div>  
        </>
    }
}

export default LoginPage