import { useState } from "react";
import {BsSend} from 'react-icons/bs'
// import useSendMessage from "./Hooks/useSendMessage";

const MessageInput = () => {
	const [message,setMessage] = useState("");
	// const {sendMessage} = useSendMessage();

	// const handleOnClick = async() => {
	// 	if(!message)return;
	// 	await sendMessage(message)
	// 	setMessage("");
	// }
	

	return (
		<div className='px-4 my-3 bg-white' >
			<div className='w-full bg-white relative'>
				<input
					type='text'
					value = {message}
					onChange = {(e) => {
						setMessage(e.target.value)
						console.log(e.target.value);		
					}}
					className='border text-sm rounded-lg block w-full p-2.5  bg-white  text-gray-500'
					placeholder='Send a message'
				/>
				<button type='submit'  className='absolute inset-y-0 end-0 flex items-center pe-3'>
                <BsSend className="text-black"/>
				</button>
			</div>
		</div>
	);
};
export default MessageInput;