import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider";
// import App from "./App";
import "./index.css";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
        {/* <App /> */}
    </React.StrictMode>
);
