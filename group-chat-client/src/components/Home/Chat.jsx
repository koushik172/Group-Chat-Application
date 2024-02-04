import React from "react";

export default function Chat() {
	return (
		<>
			<div className="h-full w-10/12 flex flex-col justify-between items-center p-4 text-slate-200 ">
				<p className="bg-violet-900/80 w-full flex justify-center p-3 rounded-md font-semibold">Chat - Name/Group</p>

				<ol className="bg-violet-700/40 w-full h-[12rem] md:h-[12rem] lg:h-[32rem] p-2 m-2 rounded-md px-16 pt-8 overflow-y-auto">
					<li className="text-right">user text - 1</li>
					<li className="text-left">user text - 2</li>
				</ol>

				<div className="bg-violet-700/40 w-full p-2 gap-4 flex rounded-md">
					<input name="" className="rounded-md w-full"></input>
					<button className="mr-2 px-4 py-1 rounded-sm text-slate-200 bg-violet-900/80 font-semibold">Send</button>
				</div>
			</div>
		</>
	);
}
