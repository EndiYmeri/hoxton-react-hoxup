import AvatarImage from "./AvatarImage"

function ConversationItem({conversation, talkingToId, navigate, participant}){

    console.log(conversation)
    return(
        <li  key={conversation.id}>
        <button
        className='chat-button'
        onClick={() => navigate(`/logged-in/${conversation.id}`)}
        >
        <AvatarImage userId={talkingToId} />
        <div>
            <h3>
            {participant.firstName} {participant.lastName}
            </h3>
            <p>Last Message Fix</p>
        </div>
        </button>
    </li>
    )
}
export default ConversationItem