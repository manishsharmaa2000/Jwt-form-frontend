import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";

import "./App.css";
import Admin from "./Admin";

function App() {
  return (
    <>
	        <Routes>

            <Route path="/" element={<Login />} />
            
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<Admin />} />

        </Routes>
	</>
  );
}

export default App;


