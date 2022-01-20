import { useState } from "react"
import H3ButtonTitle from "../components/H3ButtonTitle"
import UserLoginItem from "../components/UserLoginItem"

function LoginPage({users, logIn}){
    
    const [newUserForm, setNewUserForm] = useState(false)
    

    function addNewUser(name, surname, phone  ){
        fetch("http://localhost:4000/users",{
            method:"POST",
            headers:{
                "content-type": "application/json"
            },
            body:JSON.stringify({
                firstName: name,
                lastName: surname,
                phoneNumber: phone 
            })
        }).then(resp=> resp.json()).then(newUser => logIn(newUser))
    } 
    

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
                                <button 
                                    className="user-selection"
                                    onClick={()=>{
                                        setNewUserForm(!newUserForm)
                                    }}
                                >
                                    <H3ButtonTitle title={"+ Add new user"}/>
                                </button>
                            </li>
                            <li className={newUserForm ? "form-container open" : "form-container closed"}>
                                <form 
                                className="new-user-form"
                                onSubmit={(e)=>{
                                    e.preventDefault()
                                    addNewUser(
                                        // @ts-ignore
                                        e.target.firstName.value,
                                        // @ts-ignore
                                        e.target.lastName.value,
                                        // @ts-ignore
                                        e.target.phoneNumber.value
                                    )
                                    // @ts-ignore
                                    e.target.reset()
                                }}
                                >
                                    <H3ButtonTitle title={"Add new user"}/>
                                    <label htmlFor="firstName">
                                        <input type="text" name="firstName" placeholder="Write your first name" required/>
                                    </label>
                                    <label htmlFor="LastName">
                                        <input type="text" name="lastName" placeholder="Write your last name" required/>
                                    </label>
                                    <label htmlFor="phoneNumber">
                                        <input type="tel"
                                            name="phoneNumber" 
                                            placeholder="Write your phone number"
                                            pattern="[0-9]{3} [0-9]{3} [0-9]{4}" 
                                            required    
                                        />
                                    </label>
                                    <button type="submit">Create User</button>
                                </form>
                            </li>
                        </ul>
                    </section>
            </div>  
        </>
    }
}

export default LoginPage