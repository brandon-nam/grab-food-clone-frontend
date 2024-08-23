import React, { useEffect, useState } from "react";
import grabfoodgreen from "../images/grabfoodgreen.svg";
import { useMe } from "../hooks/useMe";
import { displayedItemsVar, isLoggedInVar, orderItemsVar } from "../apollo";
import { useReactiveVar } from "@apollo/client";
import { UserSidebar } from "./user-sidebar";
import { CartSidebar } from "./cart-sidebar";

interface HeaderProps {
    transparent: boolean;
}

export const Header: React.FC<HeaderProps> = ({ transparent }) => {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const { data } = useMe();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const displayedItems = displayedItemsVar();
    const orderItems = orderItemsVar();

    const toggleCartSidebar = () => {
        setIsCartOpen(!isCartOpen);
    };

    const toggleProfileSidebar = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsTop(true);
            } else {
                setIsTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <header className={`h-20  w-full fixed top-0 z-20`}>
                {!data?.me.verified && isLoggedIn && (
                    <div className="bg-red-500 p-3 text-center text-xs text-white sticky top-0 w-full">
                        <span>Please verify your email.</span>
                    </div>
                )}
                <div
                    className={`w-full py-5 ${isTop && transparent ? "bg-transparent" : "bg-white"} ${
                        !isTop && "shadow-md"
                    } transition-colors duration-150`}
                >
                    <div className={`px-2 h-full md:px-5 max-w-custom-xl mx-auto flex justify-between items-center`}>
                        <a href="/">
                            <img src={grabfoodgreen} className="w-24 md:w-32" alt="Grab Food" />
                        </a>
                        <div className="flex flex-row">
                            {isLoggedIn && (
                                <span className="text-xs mr-3">
                                    <CartSidebar
                                        isOpen={isCartOpen}
                                        toggleSidebar={toggleCartSidebar}
                                        orderItems={orderItems}
                                        displayedItems={displayedItems}
                                    />
                                </span>
                            )}

                            <span className="text-xs">
                                {isLoggedIn ? (
                                    <UserSidebar isOpen={isProfileOpen} toggleSidebar={toggleProfileSidebar} />
                                ) : (
                                    <div className="bg-white rounded-md px-3 py-3 border">
                                        <a href="/login">Login / Signup</a>
                                    </div>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};
