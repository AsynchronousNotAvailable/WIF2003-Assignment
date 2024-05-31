import React , {useState, useContext} from 'react'
import { GlobalContext } from '../../../../context'
import axios from 'axios'

const useSendMessage = () => {
    const {customer, messages,setMessages, userDetails, selectedSeller} = useContext(GlobalContext)
    const selectedSellerId = selectedSeller._id
    const sendMessage = async (message) => {
        try {
            const payload = {
                senderId : userDetails._id,
                message : message
            }
            const response = await axios.post(`http://localhost:5000/api/messages/send/${selectedSellerId}`, payload)
            console.log(response.data)
            setMessages([...messages, response.data])
            
        } catch (error) {
            console.log(error.message)
        }
    }
    return {sendMessage}
}

export default useSendMessage