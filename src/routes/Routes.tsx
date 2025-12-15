import { Route, Routes } from "react-router-dom";
import { HomeApp } from "../pages/Home";
import LoginApp from "../pages/Login";

export const Router = () => {
    return(
        <Routes>
            <Route path="/" Component={LoginApp}></Route>
            <Route path="/home" Component={HomeApp}></Route>
        </Routes>
    );
}