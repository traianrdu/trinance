import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./containers/Dashboard";
import Import from "./containers/Import";

export default function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/import' element={<Import />} />
        </Routes>
    );
}