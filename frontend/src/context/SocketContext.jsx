import { createContext, useState, useEffect, useContext } from "react";
import { GlobalContext } from ".";
import  io  from "socket.io-client";
 const SocketContext = createContext();

 export const useSocketContext = () => {
    return useContext(SocketContext)
 }

export const SocketContextProvider = ({children}) => {
    const [socket,setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([])
    const {userDetails} = useContext(GlobalContext)
    // const userId = userDetails?.seller?._id || userDetails?.customer?._id;
    const userId = userDetails?._id
    useEffect(()=>{
        if(userDetails){
            const socket = io("http://localhost:5000", {
                query : {
                    userId : userId
                }
            })
            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
            })

            return () => socket.close()
        }
        else {
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    }, [userDetails])
    return (
        <SocketContext.Provider value = {{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}