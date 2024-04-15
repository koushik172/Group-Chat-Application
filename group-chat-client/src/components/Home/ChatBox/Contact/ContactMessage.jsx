export default function ContactMessage({ item, index, currentChat }) {
	// MESSAGES
	if (item.type === "message") {
		return (
			<li className={`flex ${parseInt(currentChat.user2Id) === parseInt(item.senderId) ? "justify-start " : "justify-end "}`} key={index}>
				{/* MESSAGE */}
				<p
					className={`m-1 px-2 py-1 rounded-md w-fit ${
						parseInt(currentChat.user2Id) === parseInt(item.senderId) ? " bg-blue-800/60" : " bg-cyan-700/60"
					}`}
				>
					{item.message}
				</p>
			</li>
		);
	}
	// IMAGE FORMATS
	else if (item.type === "image/png" || item.type === "image/gif") {
		let str = item.message;
		let linkStart = str.indexOf("http");

		let name = str.substring(0, linkStart - 1);
		let link = str.substring(linkStart);

		return (
			<li className={`flex ${parseInt(currentChat.user2Id) === parseInt(item.senderId) ? "justify-start " : "justify-end "}`} key={index}>
				{/* MESSAGE */}
				<a href={link}>
					<img
						src={link}
						alt={name}
						className={`w-96 h-60 m-1 px-2 py-1 rounded-md  ${
							parseInt(currentChat.user2Id) === parseInt(item.senderId) ? " bg-blue-800/60" : " bg-cyan-700/60"
						}`}
					></img>
				</a>
			</li>
		);
	}
	// VIDEO FORMATS
	else if (item.type === "video/mp4") {
		let str = item.message;
		let linkStart = str.indexOf("http");

		let name = str.substring(0, linkStart - 1);
		let link = str.substring(linkStart);

		return (
			<li className={`flex ${parseInt(currentChat.user2Id) === parseInt(item.senderId) ? "justify-start " : "justify-end "}`} key={index}>
				{/* MESSAGE */}

				<video
					controls
					className={`w-96 h-60 m-1 px-2 py-1 rounded-md  ${
						parseInt(currentChat.user2Id) === parseInt(item.senderId) ? " bg-blue-800/60" : " bg-cyan-700/60"
					}`}
				>
					<source src={link} type="video/mp4" />
				</video>
			</li>
		);
	}
	// AUDIO FORMATS
	else if (item.type === "audio/mp3" || item.type === "audio/mpeg") {
		let str = item.message;
		let linkStart = str.indexOf("http");

		let name = str.substring(0, linkStart - 1);
		let link = str.substring(linkStart);

		return (
			<li className={`flex ${parseInt(currentChat.user2Id) === parseInt(item.senderId) ? "justify-start " : "justify-end "}`} key={index}>
				{/* MESSAGE */}
				<audio
					controls
					className={`w-96 mb-2 p-2 rounded-md ${
						parseInt(currentChat.user2Id) === parseInt(item.senderId) ? " bg-blue-800/60" : " bg-cyan-700/60"
					}`}
				>
					<source src={link} type={item.type} />
				</audio>
			</li>
			// <li className={`flex ${Username !== item.senderName ? "justify-start " : "justify-end "}`} key={index}>
			// 	<div>
			// 		{/* USER NAME TAG */}
			// 		<div className={`flex ${Username !== item.senderName ? "justify-start" : "justify-end"}`}>
			// 			<p className={` mt-2 px-2 rounded-t-md  ${Username !== item.senderName ? " bg-blue-700/40 " : " bg-cyan-600/60"}`}>
			// 				{item.senderName}
			// 			</p>
			// 		</div>

			// 		{/* AUDIO */}
			// 		<audio controls className={`w-96 mb-2 p-2 rounded-md ${Username !== item.senderName ? " bg-blue-800/60" : " bg-cyan-700/60"}`}>
			// 			<source src={link} type={item.type} />
			// 		</audio>
			// 	</div>
			// </li>
		);
	}
	// OTHER FILE FORMATS
	else if (item.type === "text/csv") {
		return (
			<li className={`flex ${Username !== item.senderName ? "justify-start " : "justify-end "}`} key={index}>
				<div>
					{/* USER NAME TAG */}
					<div className={`flex ${Username !== item.senderName ? "justify-start" : "justify-end"}`}>
						<p className={` mt-2 px-2 rounded-t-md  ${Username !== item.senderName ? " bg-blue-700/40 " : " bg-cyan-600/60"}`}>
							{item.senderName}
						</p>
					</div>

					{/* MESSAGE */}
					<p className={` mb-2 px-2 pb-1 rounded-b-md w-fit ${Username !== item.senderName ? " bg-blue-800/60" : " bg-cyan-700/60"}`}>
						{item.message}
					</p>
				</div>
			</li>
		);
	}
}
