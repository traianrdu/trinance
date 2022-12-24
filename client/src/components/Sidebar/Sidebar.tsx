import React from 'react';
import {RxDashboard} from 'react-icons/rx';
import {IconContext} from 'react-icons';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';
import {AiOutlineHome} from 'react-icons/ai';

const classNameFunc = ({ isActive } : { isActive:any }) => (isActive ? "Sidebar-button" : "Sidebar-button"); // either is active or not, it will show the same css

export default function Sidebar() {
    return (
        <IconContext.Provider value={{ className: "shared-class", size: "32" }}>
            <nav className="Sidebar">
                <NavLink className={classNameFunc} to='/'>
                    <AiOutlineHome />
                    <span className={"Sidebar-span"}>trinance</span>
                </NavLink>
                <NavLink className={classNameFunc} to='/dashboard'>
                    <RxDashboard />
                    <span className={"Sidebar-span"}>Dashboard</span>
                </NavLink>
            </nav>
        </IconContext.Provider>
    );
}