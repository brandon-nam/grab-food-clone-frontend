import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import bowl from "../images/bowl.svg"

export const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Helmet>
                <title>404 Not Found</title>
            </Helmet>
            <img src={bowl}></img>
            <h2 className="font-semibold text-2xl mb-3 mt-5">Oops, No Restaurant right now.</h2>
            <h4 className="font-normal w-1/4 text-center text-lg mb-5 text-wrap">Try refreshing the page on search for other keywords instead</h4>
        </div>
    );
};
