import AvatarImage from "./AvatarImage"

function ConversationItem({conversation, talkingToId, navigate, participant}){
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
            <p>Last message</p>
        </div>
        </button>
    </li>
    )
}
export default ConversationItem