import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./containers/Dashboard";

export default function MainRoutes() {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}