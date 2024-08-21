import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { CreateAccount } from "../pages/create-account";
import { Login } from "../pages/login";
import { NotFound } from "../pages/404";
import { Index } from "../pages";
import { Category } from "../pages/client/category";
import { Restaurant } from "../pages/client/restaurant";

interface IForm {
    email: string;
    password: string;
}

export const LoggedOutRouter = () => {
    return (
        <Router>
            <Routes>
                <Route key={1} path="/category/:slug" element={<Category/>}/>
                <Route key={2} path="/restaurant/:id" element={<Restaurant/>}></Route>
                <Route key={3} path="/create-account" element={<CreateAccount />}/>
                <Route key={4} path="/login" element={<Login />}/>
                <Route key={5} path="/" element={<Index/>}/>
                <Route key={6} path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    )
};
