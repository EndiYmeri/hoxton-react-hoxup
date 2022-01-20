import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function LoginPage({users, logIn}){

    if(users){
        return <>
            <div className="main-wrapper login">

                    <section className="login-section">
                        <h2>Choose your user!</h2>
                        
                        <ul>
                        {
                            users.map(user =>{
                                return (
                                        <li key={user.id}>
                                        <button 
                                            className="user-selection"
                                            onClick={()=>{
                                                logIn(user)
                                            }}

                                        ><img
                                            className="avatar"
                                            width="50"
                                            height="50"
                                            src={`https://robohash.org/${user.id}`}
                                            alt=""
                                        />
                                        <h3>{user.firstName + " " + user.lastName} </h3>
                                        </button>
                                    </li>
                                )

                            })
                        }
                            <li>
                                <button className="user-selection"><h3>+ Add a new user</h3></button>
                            </li>
                        </ul>
                    </section>
            </div>  
        </>
    }
}

export default LoginPage