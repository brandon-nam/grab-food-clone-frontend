import React from "react";

interface PageHeadingProps {
    text:React.ReactNode; 
}

export const PageHeading: React.FC<PageHeadingProps> = ({text}) => {
    return (
        <div className="w-full max-w-custom-xl mx-auto pt-32 px-3 md:px-5 mb-5">
            <h1 className="text-xl md:text-4xl font-bold  md:truncate">
                {text}
            </h1>
        </div>
    );
};
