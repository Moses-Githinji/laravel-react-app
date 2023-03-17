import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const GuestLayout = () => {
    const { token } = useStateContext();
    // Redirect a user whose token is available but they still try to login
    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-signup-form">
            <div className="form">
                <Outlet />
            </div>
        </div>
    );
};

export default GuestLayout;
