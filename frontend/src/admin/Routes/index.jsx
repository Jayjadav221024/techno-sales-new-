import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected } from './AuthProtected';
import { AuthContext } from '../context/AuthContext';
// import LoadingScreen from '../components/Common/LoadingScreen';

const Index = () => {
    const { adminData } = useContext(AuthContext);
    const hasRole = Boolean(adminData || localStorage.getItem("role"));

    return (
        <React.Fragment>
            <Routes>
                {/* When logged out, render public login routes */}
                {!hasRole && publicRoutes.map((route, idx) => (
                    <Route
                        path={route.path}
                        element={
                            <NonAuthLayout>
                                {route.component}
                            </NonAuthLayout>
                        }
                        key={idx}
                        exact={true}
                    />
                ))}

                {/* When logged in, render authenticated admin routes */}
                {hasRole && authProtectedRoutes.map((route, idx) => (
                    <Route
                        path={route.path}
                        element={
                            <AuthProtected>
                                <VerticalLayout>{route.component}</VerticalLayout>
                            </AuthProtected>
                        }
                        key={idx}
                        exact={true}
                    />
                ))}
            </Routes>
        </React.Fragment>
    );
};


export default Index;