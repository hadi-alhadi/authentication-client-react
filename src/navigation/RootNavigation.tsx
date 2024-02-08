import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import React from "react";
import SigninPage from "../pages/signin/SigninPage";
import HomePage from "../pages/home/HomePage";
import { useAppSelector } from "../redux/hooks";
import { selectAuthenticatedUser } from "../redux/slices/auth.slice";
import SignupPage from "../pages/signup/SignupPage";

const PrivateRoute = (): React.ReactElement | null => {
  const { accessToken } = useAppSelector(selectAuthenticatedUser);
  return accessToken ? <Outlet /> : <Navigate to="/signin" replace />;
};

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RootNavigation;
