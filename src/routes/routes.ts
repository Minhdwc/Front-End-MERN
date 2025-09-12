import * as React from "react";
//Page not found
const notFoundPage = React.lazy(
  () => import("@/pages/notFoundPage/notFoundPage")
);

//Page of authentication
const loginPage = React.lazy(() => import("@/pages/auth/Login/Login"));
const registerPage = React.lazy(() => import("@/pages/auth/Register/Register"));
const forgotPasswordPage = React.lazy(
  () => import("@/pages/auth/ForgotPassword/forgotPassword")
);

//Page of admin
const dashboardAdminPage = React.lazy(() => import("@/pages/admin/dashboard"));

//Page of user
const homePage = React.lazy(() => import("@/pages/user/HomePage/home"));
const detailPage = React.lazy(() => import("@/pages/user/DetailPage/detail"));
const orderPage = React.lazy(() => import("@/pages/user/Order/Order"));
export interface Route {
  path: string;
  element: any;
  isShowHeader: boolean;
  isAdmin: boolean;
}

export const routes: Route[] = [
  //User
  { path: "/", element: homePage, isShowHeader: true, isAdmin: false },
  {
    path: "/detail/:id",
    element: detailPage,
    isShowHeader: true,
    isAdmin: false,
  },
  {
    path: "/order",
    element: orderPage,
    isShowHeader: true,
    isAdmin: false,
  },

  //Admin
  {
    path: "/admin",
    element: dashboardAdminPage,
    isShowHeader: false,
    isAdmin: true,
  },

  //auth
  {
    path: "/auth/login",
    element: loginPage,
    isShowHeader: false,
    isAdmin: false,
  },
  {
    path: "/auth/register",
    element: registerPage,
    isShowHeader: false,
    isAdmin: false,
  },
  {
    path: "/auth/forgot-pass",
    element: forgotPasswordPage,
    isShowHeader: false,
    isAdmin: false,
  },

  //Not found page
  { path: "*", element: notFoundPage, isShowHeader: false, isAdmin: false },
];
