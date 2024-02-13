import './App.css'

import Chat from './components/Chat'
import Room from './components/Room'
import io from 'socket.io-client'
import { useState } from 'react'

const socket = io.connect('http://localhost:5000')

function App() {
	const [username, setUsername] = useState('')
	const [room, setRoom] = useState('')
	const [chatScreen, setChatScreen] = useState(false)
	return (
		<>
			{!chatScreen ? (
				<Room
					username={username}
					room={room}
					setUsername={setUsername}
					setRoom={setRoom}
					setCahtScreen={setChatScreen}
					socket={socket}
				/>
			) : (
				<Chat socket={socket} username={username} room={room} />
			)}
		</>
	)
}

export default App
