export default function GroupMessage({ item, index, Username }) {
	// MESSAGES
	if (item.type === "message") {
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
	// IMAGE FORMATS
	else if (item.type === "image/png" || item.type === "image/gif") {
		let str = item.message;
		let linkStart = str.indexOf("http");

		let name = str.substring(0, linkStart - 1);
		let link = str.substring(linkStart);

		return (
			<li className={`flex ${Username !== item.senderName ? "justify-start " : "justify-end "}`} key={index}>
				<div>
					{/* USER NAME TAG */}
					<div className={`flex ${Username !== item.senderName ? "justify-start" : "justify-end"}`}>
						<p className={` mt-2 px-2 rounded-t-md  ${Username !== item.senderName ? " bg-blue-700/40 " : " bg-cyan-600/60"}`}>
							{item.senderName}
						</p>
					</div>

					{/*  */}
					<a href={link}>
						<img
							src={link}
							alt={name}
							className={`w-96 h-60 mb-2 p-2 rounded-md  ${Username !== item.senderName ? " bg-blue-800/60" : " bg-cyan-700/60"}`}
						/>
					</a>
				</div>
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
			<li className={`flex ${Username !== item.senderName ? "justify-start " : "justify-end "}`} key={index}>
				<div>
					{/* USER NAME TAG */}
					<div className={`flex ${Username !== item.senderName ? "justify-start" : "justify-end"}`}>
						<p className={` mt-2 px-2 rounded-t-md  ${Username !== item.senderName ? " bg-blue-700/40 " : " bg-cyan-600/60"}`}>
							{item.senderName}
						</p>
					</div>

					{/* VIDEO */}
					<video
						controls
						className={`w-96 h-60 mb-2 p-2 rounded-md ${Username !== item.senderName ? " bg-blue-800/60" : " bg-cyan-700/60"}`}
					>
						<source src={link} type="video/mp4" />
					</video>
				</div>
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
			<li className={`flex ${Username !== item.senderName ? "justify-start " : "justify-end "}`} key={index}>
				<div>
					{/* USER NAME TAG */}
					<div className={`flex ${Username !== item.senderName ? "justify-start" : "justify-end"}`}>
						<p className={` mt-2 px-2 rounded-t-md  ${Username !== item.senderName ? " bg-blue-700/40 " : " bg-cyan-600/60"}`}>
							{item.senderName}
						</p>
					</div>

					{/* AUDIO */}
					<audio controls className={`w-96 mb-2 p-2 rounded-md ${Username !== item.senderName ? " bg-blue-800/60" : " bg-cyan-700/60"}`}>
						<source src={link} type={item.type} />
					</audio>
				</div>
			</li>
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
