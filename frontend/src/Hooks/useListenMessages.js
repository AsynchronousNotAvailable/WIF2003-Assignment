import React, {useContext, useEffect} from 'react'
import { useSocketContext } from '../context/SocketContext'
import { GlobalContext } from '../context'
const useListenMessages = () => {
 const {socket}= useSocketContext()
 const {messages,setMessages} = useContext(GlobalContext)

 useEffect( () => {
    socket?.on("newMessage", (newMessage) => {
        setMessages([...messages, newMessage])
    })
    return () => socket.off("newMessage")
 }, [socket,messages,setMessages])
}

export default useListenMessages