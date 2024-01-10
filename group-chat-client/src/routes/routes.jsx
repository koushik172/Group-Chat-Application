import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your page components
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/home" element={<HomePage />} />
			</Routes>
		</Router>
	);
}

export default AppRouter;
