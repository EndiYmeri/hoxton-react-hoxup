// @ts-nocheck
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react/cjs/react.production.min"
import AvatarImage from "../components/AvatarImage"
import ConversationItem from "../components/ConversationItem"
import H3ButtonTitle from "../components/H3ButtonTitle"



function LoggedInPage({users, currentUser, logOut, modal ,setModal}){
    const [currentConversation, setCurrentConversation] = useState([])
    const [conversations, setConversations] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser === null) navigate('/')
        }, [currentUser, navigate])

    // Get Current conversation after we select the conversation
    useEffect(() => {
        if (params.conversationId) {
        fetch(
            `http://localhost:4000/messages?conversationId=${params.conversationId}`
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


    function startNewChat(participant){
        fetch(`http://localhost:4000/conversations?userId=${currentUser.id}`,{
            method:"POST",
            headers:{
                "content-type":"application/json",
            },
            body:JSON.stringify({
                userId: currentUser.id,
                participantId: participant.id
            })
        }).then(resp=> resp.json()).then(conversation => {
            setConversations([...conversations,conversation])
            setModal(false)
            navigate(`/logged-in/${conversation.id}`)
        })
    }


    // Creating a new message
    function addNewMessage(text){
        fetch('http://localhost:4000/messages',{
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                conversationId: Number(params.conversationId),
                userId: currentUser.id,
                messageText: text
            })
        }).then(resp=> resp.json()).then(message => setCurrentConversation([...currentConversation, message]))
    }

    // Getting users that participated in convos
    let usersThatParticipatedInConvos = conversations.map(conversation => conversation.participantId)
    // Getting users that started the convos
    let usersThatStartedTheConvos = conversations.map(conversation => conversation.userId)
    console.log("Users that participated in convos:", usersThatParticipatedInConvos)
    console.log("Users that started the convos:", usersThatStartedTheConvos)

    
    const usersNotTalkedTo = users.filter((user)=>!usersThatParticipatedInConvos.includes(user.id) && !usersThatStartedTheConvos.includes(user.id) && user.id !== currentUser) 

    if (currentUser === null) return <h1>Not signed in...</h1>

    return <>
        <div className="main-wrapper">
                    {/* <!-- Side Panel --> */}
            <aside>
                {/* <!-- Side Header --> */}
                <header className="panel">
                    <AvatarImage userId={currentUser.id} />
                    <H3ButtonTitle title={currentUser.firstName + " " + currentUser.lastName} />
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
                        <button 
                            onClick={()=>{
                                setModal(true)
                            }}
                            className="chat-button">
                            <div>
                                <H3ButtonTitle title={"+ Start a new Chat"}/>
                            </div>
                        </button>
                        <div className={modal? "modal opened":"modal closed"}>
                            <button
                                onClick={()=>{
                                    setModal(false)
                                }} 
                                className="close-button">X</button>
                            <ul className="addUserModal">
                                <H3ButtonTitle title={"Pick a user to talk to"}/>
                                {
                                 usersNotTalkedTo.map(user=>{
                                     return(
                                        <li  key={user.id}>
                                        <button
                                        className='chat-button'
                                        onClick={() => {
                                            startNewChat(user)
                                        }}>
                                            <AvatarImage userId={user.id} />
                                            <div>
                                                <h3>
                                                {user.firstName} {user.lastName}
                                                </h3>
                                            </div>
                                        </button> 
                                    </li>
                                     )
                                 })   
                                }
                            </ul>
                        </div>
                    </li>
                        {conversations.map(conversation => {
                            // which id am I talking to
                            const talkingToId =
                            currentUser.id === conversation.userId
                                ? conversation.participantId
                                : conversation.userId
                            
                            // what are their details?
                            const participant = users.find(user => user.id === talkingToId)
                            return (
                            <ConversationItem 
                                conversation={conversation} 
                                talkingToId={talkingToId} 
                                navigate={navigate}
                                participant={participant}
                            />
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
                 {  
                    // console.log(currentConversation.messages)
                     currentConversation.map(message => {
                         return (
                            <li 
                                key={message.id}
                                className={message.userId === currentUser.id ? "outgoing" : ""}>
                            <p>
                              {message.messageText}
                            </p>
                          </li>
                         )
                     })
                 }
                 
                 </ul>
 
                 {/* <!-- Message Box --> */}
                 <footer>
                 <form className="panel conversation__message-box"
                    onSubmit={(e)=>{
                        e.preventDefault()
                        addNewMessage(e.target.messageText.value)
                        e.target.reset()
                    }}
                 >
                     <input
                     type="text"
                     placeholder="Type a message"
                     // @ts-ignore
                     rows="1"
                     name="messageText"
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