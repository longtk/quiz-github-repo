import React, { Suspense, lazy } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { LoadingFullPage } from "./core/components/Loading";
import { useLocalStorage } from "./api/layer/useLocaleStorage";

const Registration = lazy(() => import("./pages/Registration/Registration"));
const Login = lazy(() => import("./pages/Login/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const UpdateInfo = lazy(() => import("./pages/User/UpdateInfo"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));

const AppRouter: React.FC = () => {
  const { token } = useLocalStorage();

  return (
    <Suspense fallback={<LoadingFullPage />}>
      <Routes>
        {token ? (
          <>
            <Route path="/" Component={Dashboard} />
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="*" element={<ErrorPage code={404} />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/user-info" Component={UpdateInfo} />
          </>
        ) : (
          <>
            <Route path="/registration" Component={Registration} />
            <Route path="/" Component={Login} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
