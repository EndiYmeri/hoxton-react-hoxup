import AvatarImage from "./AvatarImage"
import H3ButtonTitle from "./H3ButtonTitle"

function UserLoginItem({user, logIn}){
    return (
        <li key={user.id}>
        <button 
            className="user-selection"
            onClick={()=>{
                logIn(user)
            }}
        >   
        <AvatarImage userId={user.id} />
        <H3ButtonTitle title={user.firstName + " " + user.lastName} />
        </button>
    </li>
    )
}   

export default UserLoginItem