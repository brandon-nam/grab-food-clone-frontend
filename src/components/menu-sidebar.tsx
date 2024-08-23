import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { CreateOrderItemInput, Dish, DishOption, Maybe, OrderItemOption } from "../__generated__/graphql";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { DisplayedItem } from "./cart";
import { orderPriceVar } from "../apollo";

// // const CREATE_ORDER_MUTATION = gql(`
// //     mutation CreateOrder {
// //         createOrder($input: CreateOrderInput) {
// //             ok
// //             error
// //             orderId
// //         }
// //     }
// // `);

interface MenuProps {
    options: DishOption[];
    isOpen: boolean;
    toggleSidebar: () => void;
    setOrderItem: (orderItem: CreateOrderItemInput) => void;
    setDisplayedItem: (displayedItem: DisplayedItem) => void;
    dish: Dish | undefined;
}

export const MenuSidebar: React.FC<MenuProps> = ({ options, isOpen, toggleSidebar, dish, setOrderItem, setDisplayedItem }) => {
    const { register, getValues, formState, handleSubmit } = useForm();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if(dish) {
            setTotalPrice(dish.price);
        }
    },[dish])

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, extra: Maybe<number> | undefined) => {
        const isSelected = e.target.checked;
        console.log(isSelected);
        if (!extra) {
            return;
        }

        if (isSelected) {
            setTotalPrice((prevPrice) => prevPrice + extra);
        } else {
            setTotalPrice((prevPrice) => prevPrice - extra);
        }
    };

    const constructOptionInput = () => {
        const options = getValues();
        const newOptionInputs: OrderItemOption[] = [];

        for (const [key, value] of Object.entries(options)) {
            if (typeof options[key] === "string") {
                newOptionInputs.push({
                    name: key,
                    option: value,
                });
            } else if (typeof options[key] === "boolean") {
                newOptionInputs.push({
                    name: key,
                });
            }
        }
        return newOptionInputs;
    };

    const addToCart = () => {
        const newOptionInputs = constructOptionInput();
        setOrderItem({
            dishId: dish ? dish.id : 0,
            options: newOptionInputs,
            price: totalPrice
        });
        setDisplayedItem({
            coverImage: dish?.photo ? dish.photo : "",
            dish: dish ? dish.name : "",
            options: newOptionInputs,
        });
        orderPriceVar(totalPrice);
        toggleSidebar();
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

            {options?.map((option) => (
                <form onSubmit={addToCart} key={option.name}>
                    <h1>{option.name}</h1>
                    <div className="flex flex-col">
                        {option.choices ? (
                            option.choices.map((choice) => (
                                <label key={choice.name}>
                                    <input
                                        type="radio"
                                        value={choice.name} // Set the value to the choice name
                                        {...register(`${option.name}`)} // Use the option name to group radio buttons
                                        onChange={(e) => handleOptionChange(e, choice.extra)}
                                    />
                                    {choice.name}
                                </label>
                            ))
                        ) : (
                            <label key={option.name}>
                                <input
                                    type="checkbox"
                                    {...register(`${option.name}`)}
                                    onChange={(e) => handleOptionChange(e, option.extra)}
                                />
                                {option.name}
                            </label>
                        )}
                    </div>
                </form>
            ))}
            <h1>{totalPrice}</h1>
            <Button canClick={true} loading={false} actionText={"Add to cart"} onClick={addToCart} />
        </div>
    );
};
