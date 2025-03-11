import React from 'react'
//Page not found
const notFoundPage = React.lazy(()=>import('../pages/notFoundPage/notFoundPage'))

//Page of authentication
const loginPage = React.lazy(()=>import('../pages/auth/login'))
const registerPage = React.lazy(()=>import('../pages/auth/register'))
const forgotPasswordPage = React.lazy(()=>import('../pages/auth/forgotPassword'))

//Page of admin
const dashboardAdminPage = React.lazy(()=>import('../pages/admin/dashboard'))

//Page of user
const homePage = React.lazy(()=>import('../pages/user/home'))

export interface Route{
    path: string,
    element: any,
    isShowHeader: boolean,
    isAdmin: boolean
}

export const routes : Route[]=[
    //User
    { path: "/", element: homePage, isShowHeader: true, isAdmin: false},

    //Admin
    { path: "/admin", element: dashboardAdminPage, isShowHeader: false, isAdmin: true},

    //auth
    { path: "/auth/login", element: loginPage, isShowHeader: false, isAdmin: false},
    { path: "/auth/register", element: registerPage, isShowHeader: false, isAdmin: false},
    { path: "/auth/forgot-pass", element: forgotPasswordPage, isShowHeader: false, isAdmin: false},

    //Not found page
    { path: "*", element: notFoundPage, isShowHeader: false, isAdmin: false}
]
