import React from 'react';
import {IconContext} from 'react-icons';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';

const classNameFunc = ({ isActive } : {isActive:any}) => (isActive ? "Sidebar-button" : "Sidebar-button"); // either is active or not, it will show the same css

export default function Sidebar() {
    return (
        <nav className="Sidebar">
            <NavLink className={classNameFunc} to='/'>
                Dashboard
            </NavLink>
            <NavLink className={classNameFunc} to='/dashboard'>
                Dashboard
            </NavLink>
        </nav>
    );
}