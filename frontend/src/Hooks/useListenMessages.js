import React, {useContext, useEffect} from 'react'
import { useSocketContext } from '../context/SocketContext'
import { GlobalContext } from '../context'
const useListenMessages = () => {
 console.log("useListenMessages is running");
 const {socket}= useSocketContext()
 const {messages,setMessages} = useContext(GlobalContext)

 useEffect( () => {
    console.log("Socket is on");
    socket?.on("newMessage", (newMessage) => {
        console.log(newMessage)
        setMessages([...messages, newMessage])
    })
    return () => socket.off("newMessage")
 }, [socket,messages,setMessages])
}

export default useListenMessages