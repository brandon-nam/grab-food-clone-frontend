import React from "react";
import { Route } from "react-router-dom";
import { Restaurants } from "./client/restaurants";
import { Header } from "../components/header";
import { ConfirmEmail } from "./user/confirm-email";
import { EditProfile } from "./user/edit-profile";
import foodPhoto from "../images/foodphoto.png";

export const Index = () => {

    // const { data, loading, error } = useMe();

    // if (!data || loading || error) {
    //     return (
    //         <div className="h-screen flex justify-center items-center">
    //             <span className="font-medium text-xl tracking-wide">Loading...</span>
    //         </div>
    //     );
    // }
    return (
        <div className="h-screen">
            <Header transparent={true}/>
            <div className="h-1/2">
                <img src={foodPhoto} className="h-full w-full object-cover" />
            </div>
            <Restaurants/>
        </div>
    );
};
