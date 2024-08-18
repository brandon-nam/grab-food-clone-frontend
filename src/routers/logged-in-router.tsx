import React from "react";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { gql, useQuery } from "@apollo/client";
import { MeQuery } from "../__generated__/graphql";
import { Button } from "../components/button";
import { redirect, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Restaurants } from "../pages/client/restaurant";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";

const ClientRoutes = (
    <Route path="/">
        <Restaurants />
    </Route>
);


export const LoggedInRouter = () => {
    const onClick = () => {
        isLoggedInVar(false);
        authTokenVar("");
        return redirect("/login");
    };

    const { data, loading, error } = useMe();

    if (!data || loading || error) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="font-medium text-xl tracking-wide">Loading...</span>
            </div>
        );
    }
    return (
        <div>
            <Router>
                <Header />
                <Routes>{data.me.role === "Client" && ClientRoutes}</Routes>
            </Router>
            <h1>{data.me.role}</h1>
            <Button actionText="Log Out" canClick={true} loading={false} onClick={onClick}></Button>
        </div>
    );
};
