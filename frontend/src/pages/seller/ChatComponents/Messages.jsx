import React, {useContext, useEffect} from 'react'
import Message from './Message'
import useGetMessages from './Hooks/useGetMessages'
const Messages = () => {
    //Call the hook here
    //Save conversation
    //Loop through conversation using Message
    const {messages} = useGetMessages()
    
    console.log(messages)

    return (
        <div>
            {messages ? messages.map((message) => <Message message = {message} key = {message._id} />) : <div className = "mt-20 bg-black">Start a new conversation.</div>}
        </div>
    )
  
  
 
}

export default Messages