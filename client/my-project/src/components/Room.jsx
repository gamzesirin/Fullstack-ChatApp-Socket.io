const Room = ({ username, room, setUsername, setRoom, socket, setCahtScreen }) => {
	const sendRoom = () => {
		socket.emit('room', room)
		setCahtScreen(true)
	}
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
				<h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Welcome to Chat!</h1>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="block w-full px-4 py-2 mb-3 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
					type="text"
					placeholder="Username"
				/>
				<input
					value={room}
					onChange={(e) => setRoom(e.target.value)}
					className="block w-full px-4 py-2 mb-3 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
					type="text"
					placeholder="Room"
				/>
				<button
					onClick={sendRoom}
					className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
				>
					Join
				</button>
			</div>
		</div>
	)
}

export default Room
