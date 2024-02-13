// Chat.js

import React, { useEffect, useState } from 'react'

const Chat = ({ socket, username, room }) => {
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])

	useEffect(() => {
		socket.on('messageReturn', (messageContent) => {
			setMessages((prevMessages) => [...prevMessages, messageContent])
		})
	}, [socket])

	const sendMessage = () => {
		if (message.trim()) {
			const messageContent = {
				username,
				room,
				message: message.trim(),
				date: new Date().toLocaleString()
			}
			socket.emit('sendMessage', messageContent)
			setMessage('')
		}
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
				<div className="border-b">
					<div className="flex justify-between items-center p-3">
						<h3 className="text-xl font-semibold text-gray-800">Chat Room: {room}</h3>
						<div className="text-gray-600">{username}</div>
					</div>
				</div>
				<div className="w-full h-[500px] overflow-y-auto p-3">
					{messages.map((msg, i) => (
						<div key={i} className={`${username === msg.username ? 'flex justify-end' : ''}`}>
							<div
								className={`${
									username === msg.username ? 'bg-green-600' : 'bg-blue-500'
								} w-2/3 h-12 text-white m-2 rounded-xl rounded-br-none`}
							>
								<div className="text-start pl-2">{msg.message}</div>
								<div className="w-full flex justify-end text-xs">
									{msg.username} {msg.date}
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="flex p-3 border-t">
					<input
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						type="text"
						placeholder="Type a message..."
						className="w-full p-2 mr-2 border rounded shadow-inner outline-none"
						onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
					/>
					<button
						onClick={sendMessage}
						className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 focus:outline-none"
					>
						Send
					</button>
				</div>
			</div>
		</div>
	)
}

export default Chat
