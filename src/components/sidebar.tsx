import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <div
            className={`fixed top-0 right-0 h-full w-custom-lg bg-white text-black transform ${
                isOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out z-40`}
        >
            <div className="border h-20 flex flex-col justify-center">
                <a className="w-16 h-full px-7 left-0 py-7 cursor-pointer" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faX} className="cursor-pointer"/>
                </a>
            </div>
            <nav className="mt-5 text-sm justify-between">
                <ul>
                    <li className="px-5 py-4">
                        <a href="#">On-going orders</a>
                    </li>
                    <li className="px-5 py-4">
                        <a href="/edit-profile">Edit profile</a>
                    </li>
                    <li className="px-5 py-4">
                        <a href="#">Log out</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
