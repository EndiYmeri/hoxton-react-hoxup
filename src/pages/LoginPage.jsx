import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function LoginPage(){

    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetch("http://localhost:4000/users")
            .then(resp=> resp.json())
                .then(users => setUsers(users))

        },[])

    function setLoggedInUser(userInfo){
        fetch("http://localhost:4000/loggedInUser",{
            method:"PATCH",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify({
                user: userInfo
            })
        })
    }

    const navigate = useNavigate()

    
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
                                                setLoggedInUser(user)
                                                navigate('/logged-in')
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