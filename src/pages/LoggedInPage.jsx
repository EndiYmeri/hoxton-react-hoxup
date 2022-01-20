import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"



function LoggedInPage(){
    
    const [loggedInUser, setLoggedInUser] = useState({
        firstName: "",
        lastName: "",
        id: "",

    })


    const [conversation, setConversation] = useState([])


    // if User not signed in redirect to login page
    const navigate = useNavigate()
    useEffect(()=>{
        
        // navigate('/')
    },[])
    
    
    useEffect(()=>{
        fetch('http://localhost:4000/loggedInUser')
        .then(resp => resp.json())
            .then(user => {
                setLoggedInUser(user.user)
            })
        
        if(params.conversationId){
            // Fetchinngg
        }
    },[])

    let params = useParams()
    return <>
        <div className="main-wrapper">
                    {/* <!-- Side Panel --> */}
            <aside>
                {/* <!-- Side Header --> */}
                <header className="panel">
                    <img
                        className="avatar"
                        width="50"
                        height="50"
                        src={`https://robohash.org/${loggedInUser.id}`}
                        alt=""
                    />
                    <h3>{loggedInUser.firstName + " " + loggedInUser.lastName}</h3>
                </header>

                {/* <!-- Search form --> */}
                <form className="aside__search-container">
                <input
                    type="search"
                    name="messagesSearch"
                    placeholder="Search chats"
                    value=""
                />
                </form>
                <ul>
                {/* <!-- This first item should always be present --> */}
                    <li>
                        <button className="chat-button">
                        <div><h3>+ Start a new Chat</h3></div>
                        </button>
                    </li>
                    <li>
                        <button className="chat-button">
                        <img
                            className="avatar"
                            height="50"
                            width="50"
                            alt=""
                            src="https://robohash.org/2"
                        />
                        <div>
                            <h3>Tin Man</h3>
                            <p>Last message</p>
                        </div>
                        </button>
                    </li>
                    <li>
                        <button className="chat-button">
                        <img
                            className="avatar"
                            height="50"
                            width="50"
                            alt=""
                            src="https://robohash.org/3"
                        />
                        <div>
                            <h3>Carl T-800</h3>
                            <p>Last message</p>
                        </div>
                        </button>
                    </li>
                </ul>

            </aside>

            {/* <!-- Main Chat Section --> */}
            {params.conversationId? (
                 <main className="conversation">
                 {/* <!-- Chat header --> */}
                 <header className="panel"></header>
 
                 {/* <!-- 
 
                 The Messages List will go here. Check main-messages-list.html
                 --> */}
                 <ul className="conversation__messages">
 
 
                 </ul>
 
                 {/* <!-- Message Box --> */}
                 <footer>
                 <form className="panel conversation__message-box">
                     <input
                     type="text"
                     placeholder="Type a message"
                     // @ts-ignore
                     rows="1"
                     value=""
                     /><button type="submit">
                     {/* <!-- This is the send button --> */}
                     <svg
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         width="24"
                         height="24"
                     >
                         <path
                         fill="currentColor"
                         d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
                         ></path>
                     </svg>
                     </button>
                 </form>
                 </footer>
                </main>
            )
                
                : null
            }
           
        </div>
    </>
}

export default LoggedInPage