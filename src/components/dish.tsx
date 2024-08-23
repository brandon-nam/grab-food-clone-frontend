import React from "react";

interface IDishProps {
    description: string;
    name: string;
    price: number;
    photo?: string | null;
    onClick: () => void; 
}

export const DishComponent: React.FC<IDishProps> = ({ description, name, price, photo, onClick }) => {
    return (
        <div onClick={onClick} className=" px-8 py-4 border cursor-pointer hover:border-gray-800 flex flex-row rounded-md">
            {photo && (
                <div className="mr-5">
                    <img src={`${photo}`} className=" rounded-md" />
                </div>
            )}
            <div className="mb-5 flex flex-col">
                <h3 className="text-lg font-medium ">{name}</h3>
                <h4 className="font-medium">{description}</h4>
            </div>
            <span>${price}</span>
        </div>
    );
};
