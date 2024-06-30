import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = ({ component: Component, ...rest }) => {

  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return null;
  }


  const { location } = rest;
  const { pathname } = location;

  function hasRole(role)
  {
    return localStorage.getItem('roles').includes(role);
  }


  // switch (pathname) {
  //   case "/c/posts":
  //     if (!isAuthenticated || !hasRole("admin")) {
  //       return <Redirect to="/" />;
  //     }
  //     break;
  //   case "/c/subscription":
  //     if (!isAuthenticated || !hasRole("user")) {
  //       return <Redirect to="/" />;
  //     }
  //     break;
  //   case "/c/dashboard":
  //     if (!isAuthenticated || !hasRole("admin")) {
  //       return <Redirect to="/" />;
  //     }
  //     break;
  //   case "/c/pdfos":
  //       if (!isAuthenticated || !hasRole("admin")) {
  //         return <Redirect to="/" />;
  //       }
  //       break;
  //   default:
  //       return <Redirect to="/" />;
  //     break;
  // }
  
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
