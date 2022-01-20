import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"



function LoggedInPage({users, currentUser, logOut}){
    const [currentConversation, setCurrentConversation] = useState(null)
    const [conversations, setConversations] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser === null) navigate('/')
        }, [currentUser, navigate])

    useEffect(() => {
        if (params.conversationId) {
        fetch(
            `http://localhost:4000/conversations/${params.conversationId}?_embed=messages`
        )
            .then(resp => resp.json())
            .then(conversation => setCurrentConversation(conversation))
        }
    }, [params.conversationId])

    useEffect(() => {
        if (currentUser === null) return

        fetch(`http://localhost:4000/conversations?userId=${currentUser.id}`)
        .then(resp => resp.json())
        .then(conversations => setConversations(conversations))
    }, [currentUser])

    if (currentUser === null) return <h1>Not signed in...</h1>

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
                        // @ts-ignore
                        src={`https://robohash.org/${currentUser.id}`}
                        alt=""
                    />
                    <h3>{
// @ts-ignore
                    currentUser.firstName + " " + currentUser.lastName}</h3>
                    <button onClick={()=>{
                        logOut()
                    }}>Log Out</button>

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
                        {conversations.map(conversation => {
                            // which id am I talking to
                            const talkingToId =
                            currentUser.id === conversation.userId
                                ? conversation.participantId
                                : conversation.userId
                            
                            // what are their details?
                            const participant = users.find(user => user.id === talkingToId)
                            console.log(participant);
                        
                            
                            return (
                            <li  key={conversation.id}>
                                <button
                                className='chat-button'
                                onClick={() => navigate(`/logged-in/${conversation.id}`)}
                                >
                                <img
                                    className='avatar'
                                    height='50'
                                    width='50'
                                    alt=''
                                    src={`https://robohash.org/${talkingToId}`}
                                />
                                <div>
                                    <h3>
                                    {/* {talkingToUser.firstName} {talkingToUser.lastName} */}
                                    </h3>
                                    <p>Last message</p>
                                </div>
                                </button>
                            </li>
                            )
                        })}
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