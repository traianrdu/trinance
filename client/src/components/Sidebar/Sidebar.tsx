import React from 'react';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';
import {RxDashboard} from 'react-icons/rx';
import {IconContext} from 'react-icons';
import {AiOutlineHome} from 'react-icons/ai';
import {BiImport} from 'react-icons/bi';

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
                <NavLink className={classNameFunc} to='/import'>
                    <BiImport />
                    <span className={"Sidebar-span"}>Import</span>
                </NavLink>
            </nav>
        </IconContext.Provider>
    );
}