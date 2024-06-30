import React, { Fragment, Suspense, lazy, useEffect } from "react";
import { ThemeProvider, StyledEngineProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Switch, useLocation  } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import Pace from "./shared/components/Pace";
import { store } from "./redux/store";
import { Provider, useDispatch } from "react-redux";
import PrivateRoute from "./redux/privateRoute";
import { verifyToken } from "./redux/slices/authSlice"
import { LoadingProvider } from "./shared/components/LoadingContext";

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

const LocationLogger = () => {
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [location]);

  return null;
};


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <LoadingProvider>
            <Pace color={theme.palette.primary.light} />
            <Suspense fallback={<Fragment />}>
              <LocationLogger />
              <Switch>
                <PrivateRoute path="/c" component={LoggedInComponent} />
                <Route>
                  <LoggedOutComponent />
                </Route>
              </Switch>
            </Suspense>
            </LoadingProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
