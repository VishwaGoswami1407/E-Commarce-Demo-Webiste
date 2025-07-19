import React from "react";

import { Navigate } from 'react-router-dom';

//privateRoute -> sir login hone ke baad access mile
export function PrivateRoute({children}){
    const isLoggedIn = localStorage.getItem('isAuthenticated')==='true';
    if(isLoggedIn){
        return children;
    }else{
        return <Navigate to="/login" />
    }
}

export function PublicRoute({children}){
    const isLoggedIn = localStorage.getItem('isAuthenticated')==='true';
    if(!isLoggedIn){
        return children;
    }else{
        return <Navigate to="/home" />
    }
}