import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./containers/Dashboard";
import Import from "./containers/Import";
import TableView from "./containers/TableView";

export default function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/tableview' element={<TableView />} />
            <Route path='/import' element={<Import />} />
        </Routes>
    );
}