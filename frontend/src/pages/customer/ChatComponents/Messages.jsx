import React, {useContext, useEffect} from 'react'
import Message from './Message'
import useGetMessages from './Hooks/useGetMessages'
import { GlobalContext } from "../../../context";
import useListenMessages from "../../../hooks/useListenMessages.js";
const Messages = () => {
    //Call the hook here
    //Save conversation
    //Loop through conversation using Message
    const {messages} = useGetMessages()
    useListenMessages()
    console.log(messages)

    return (
        <div>
            {/* {conversationMessages.map((message) => 
                <Message message = {message} key = {message._id} />
            )} */}
            {messages ? messages.map((message) => <Message message = {message} key = {message._id} />) : <div className = "mt-20 bg-black">Start a new conversation.</div>}
        </div>
    )
  
    // allMessages.map((message) => {
    //     return (
    //         <Message message = {message}/>
    //       )
    // })
 
}

export default Messages