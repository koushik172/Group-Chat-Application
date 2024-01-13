import React from "react";

export default function Home() {
	return (
		<div className="h-screen bg-blue-950 flex">
			<div className="p-10 flex flex-col w-full">
				<p className="py-4 mb-4 flex justify-center items-center text-4xl font-semibold text-slate-700 bg-slate-400 rounded-md backdrop-blur-md">
					Chat App
				</p>
				<div className="grid grid-col-4 grid-flow-col bg-slate-500 w-full h-full rounded-md">
					{/* CHATLOG */}
					<ol className="col-span-1 flex flex-col justify-start items-center py-8 bg-slate-400 my-4 ml-4 rounded-md ">
						<li className="">PERSON 1</li>
						<li className="">GROUP 1</li>
					</ol>

					{/* CHATBOX */}
					<div className="col-span-3 flex flex-col justify-end items-center p-4">
						<p className="bg-slate-400 w-full flex justify-center p-2 rounded-md">Chat - Name/Group</p>
						<ol className="bg-slate-400 w-full h-[12rem] md:h-[12rem] lg:h-[32rem] p-2 m-2 rounded-md px-16 pt-8 overflow-y-auto">
							<li className="text-right">user text - 1</li>
							<li className="text-left">user text - 2</li>
						</ol>
						<div className="w-full p-2 gap-4 flex bg-slate-400 rounded-md">
							<input name="" className="rounded-md w-full"></input>
							<button className="mr-2 px-4 py-1 rounded-md text-slate-200 bg-slate-500 ">Send</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
