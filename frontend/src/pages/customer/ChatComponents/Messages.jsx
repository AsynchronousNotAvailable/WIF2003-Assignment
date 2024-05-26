import React, {useContext, useEffect} from 'react'
import Message from './Message'
import useGetMessages from './Hooks/useGetMessages'
import { GlobalContext } from "../../../context";
const Messages = () => {
    const {allMessages,setAllMessages, customer,selectedSeller} = useContext(GlobalContext);
    //Call the hook here
    //Save conversation
    //Loop through conversation using Message
    const {conversationMessages, setConversationMessages} = useGetMessages()
    console.log(conversationMessages)

    return (
        <div>
            {/* {conversationMessages.map((message) => 
                <Message message = {message} key = {message._id} />
            )} */}
            {conversationMessages ? conversationMessages.map((message) => <Message message = {message} key = {message._id} />) : <div className = "mt-20 bg-black">Start a new conversation.</div>}
        </div>
    )
  
    // allMessages.map((message) => {
    //     return (
    //         <Message message = {message}/>
    //       )
    // })
 
}

export default Messages