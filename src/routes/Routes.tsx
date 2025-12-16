import { Navigate, Route, Routes } from "react-router-dom";
import { HomeApp } from "../pages/Home";
import LoginApp from "../pages/Login";
import { PrivateRoute } from "./PrivateRoutes";

export const Router = () => {
    return(
        <Routes>
            <Route path="/login" Component={LoginApp}></Route>
            <Route element={<PrivateRoute></PrivateRoute>}>
                <Route path="/home" Component={HomeApp}></Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}