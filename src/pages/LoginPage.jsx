import { useEffect, useState } from "react"

function LoginPage(){

    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetch("http://localhost:4000/users")
            .then(resp=> resp.json())
                .then(users => setUsers(users))

        },[])
    
    if(users){
        return <>
            <div className="main-wrapper login">

                    <section className="login-section">
                        <h2>Choose your user!</h2>
                        
                        <ul>
                        {
                            users.map(user =>{
                                return (
                                    <li>
                                    <button className="user-selection">
                                    <img
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