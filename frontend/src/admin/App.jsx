import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.css";
import Route from "./Routes";
import axios from "axios";

import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";
import { ToastContainer } from "react-toastify";
import config from "./config";

export default function AdminApp() {
    axios.defaults.baseURL = config.api.API_URL;

    return (
        <AuthProvider>
            <MenuProvider>
                <ToastContainer />
                <Route />
            </MenuProvider>
        </AuthProvider>
    );
}
