import React from 'react';
import Sidebar from './components/Sidebar';
import MainRoutes from './MainRoutes';
import './App.css'

function App() {
    return (
        <div className="container">
            <Sidebar/>
            <MainRoutes/>
        </div>
    );
}

export default App;
