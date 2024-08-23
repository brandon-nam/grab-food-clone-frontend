import React from "react";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { redirect, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { TOKEN } from "../constants";
import { Index } from "../pages";
import { Category } from "../pages/client/category";
import { Restaurant } from "../pages/client/restaurant";
import { MyRestaurants } from "../pages/owner/my-restaurants";
import { NotFound } from "../pages/404";
import { AddRestaurant } from "../pages/owner/add-restaurants";
import { OrderReview } from "../pages/client/order-review";
import { ConfirmedOrder } from "../pages/user/confirmed-order";
import { Dashboard } from "../pages/driver/dashboard";
import { UserRole } from "../__generated__/graphql";

const ClientRoutes = [
    <Route key={1} path="/order-review" element={<OrderReview/>}/>,
    <Route key={2} path="/confirm" element={<ConfirmEmail />} />,
    <Route key={3} path="/edit-profile" element={<EditProfile />} />,
    <Route key={4} path="/category/:slug" element={<Category />} />,
];

const OwnerRoutes = [
    <Route key={6} path="/my-restaurants" element={<MyRestaurants />} />,
    <Route key={7} path="/add-restaurant" element={<AddRestaurant />} />,
];

const DriverRoutes = [
    <Route key={1} path="/dashboard" element={<Dashboard/>}/>
]

const CommonRoutes = [
    <Route key={1} path="/confirmed-order/:id" element={<ConfirmedOrder/>} />,
    <Route key={2} path="/" element={<Index />} />,
    <Route key={3} path="/restaurant/:id" element={<Restaurant />} />,
    <Route key={4} path="*" element={<NotFound />} />,
];

export const LoggedInRouter = () => {
    // const onClick = () => {
    //     localStorage.setItem(TOKEN, "");
    //     isLoggedInVar(false);
    //     authTokenVar("");
    //     return redirect("/login");
    // };

    const { data, loading, error } = useMe();

    if (!data || loading || error) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="font-medium text-xl tracking-wide">Loading...</span>
            </div>
        );
    }
    return (
        <Router>
            <Routes>
                {CommonRoutes}
                {data.me.role === UserRole.Client && ClientRoutes}
                {data.me.role === UserRole.Owner && OwnerRoutes}
                {data.me.role === UserRole.Delivery && DriverRoutes}
            </Routes>
        </Router>
    );
};
