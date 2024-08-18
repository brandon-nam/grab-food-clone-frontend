import React from "react";
import { isLoggedInVar } from "../apollo";
import { useForm } from "react-hook-form";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { CreateAccount } from "../pages/create-account";
import { Login } from "../pages/login";
import { NotFound } from "../pages/404";

interface IForm {
    email: string;
    password: string;
}

export const LoggedOutRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/create-account" element={<CreateAccount />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    )
};
