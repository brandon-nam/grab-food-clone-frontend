import React from "react";
import grabfoodgreen from "../images/grabfoodgreen.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useMe } from "../hooks/useMe";

export const Header = () => {
    const { data } = useMe();
    return (
        <header className="h-12 md:h-20 shadow-md">
            <div className="px-2 h-full md:px-5 max-w-custom-xl mx-auto flex justify-between items-center">
                <img src={grabfoodgreen} className="w-24 md:w-32" alt="Nuber Eats" />
                <span className="text-xs">
                    <Link to="/my-profile">
                        <FontAwesomeIcon icon={faUser} className="text-xl" />
                    </Link>
                </span>
            </div>
        </header>
    );
};
