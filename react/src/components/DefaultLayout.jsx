import { upperCase } from "lodash";
import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

const DefaultLayout = () => {
    const { user, token, notification, setUser, setToken } = useStateContext();

    // Check whether we have a token
    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div style={{ textTransform: "uppercase" }}>
                        Admin Layer
                    </div>
                    <div>
                        {user.name} &nbsp; &nbsp;
                        <a href="#" onClick={onLogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
};

export default DefaultLayout;
