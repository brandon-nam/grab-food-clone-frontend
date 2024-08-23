import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import emptyCart from "../images/empty-cart.svg";
import { CreateOrderItemInput, OrderItemOption } from "../__generated__/graphql";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { orderPriceVar } from "../apollo";

export interface DisplayedItem {
    coverImage: string;
    dish: string;
    options: OrderItemOption[];
}

export interface CartProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    orderItems: CreateOrderItemInput[];
    displayedItems: DisplayedItem[];
}

export const Cart: React.FC<CartProps> = ({ isOpen, toggleSidebar, orderItems, displayedItems }) => {
    const navigate = useNavigate();
    const totalPrice = orderPriceVar();

    const onSubmit = () => {
        navigate("/order-review");
    };

    return (
        <div
            className={`fixed top-0 right-0 h-full w-custom-lg bg-white text-black transform ${
                isOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out z-40`}
        >
            <div className="border h-20 flex flex-col justify-center">
                <a className="w-16 h-full px-7 left-0 py-7 cursor-pointer" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faX} className="cursor-pointer" />
                </a>
            </div>
            {displayedItems.length == 0 && (
                <div className="text-center">
                    <img src={emptyCart} className="mt-5" />
                    <h1 className="text-2xl">Start grabbing food!</h1>
                    <h2 className="text-xs text-gray-400">Add items to your basket and place order here.</h2>
                </div>
            )}
            {displayedItems.map((displayedItem) => (
                <div className="flex flex-row">
                    <div>
                        <img src={displayedItem.coverImage} />
                    </div>
                    <div className="flex flex-col">
                        <h1>{displayedItem.dish}</h1>
                        {displayedItem.options?.map((option) => {
                            if (option.option) {
                                return <h1>{option.option}</h1>;
                            } else {
                                return <h1>{option.name}</h1>;
                            }
                        })}
                    </div>
                </div>
            ))}
            {displayedItems.length !== 0 && <h1>Price: {`${totalPrice}`}</h1>}
            <div>
                {displayedItems.length !== 0 && (
                    <Button actionText="Review Order" canClick={true} loading={false} onClick={onSubmit} />
                )}
            </div>
        </div>
    );
};
