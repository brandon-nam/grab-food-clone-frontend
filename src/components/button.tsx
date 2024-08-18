import React from "react";

interface ButtonProps {
    canClick: boolean;
    loading: boolean;
    actionText: string;
    onClick: () => void; 
}

export const Button: React.FC<ButtonProps> = ({ canClick, loading, actionText, onClick }) => {
    return (
        <button
            className={`transition-colors duration-300 ${
                canClick ? "bg-primary cursor-pointer hover:bg-green-400" : "bg-gray-300 cursor-not-allowed"
            } text-white py-5 rounded-2xl text-xl my-3`}
            onClick={onClick}
        >{`${loading ? "Loading..." : actionText} `}</button>
    );
};
