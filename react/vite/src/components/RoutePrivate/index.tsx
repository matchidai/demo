import React from "react";
import Login from "../Login";
import {Hooks} from "@matchain/matchid-sdk-react";
import { Outlet} from 'react-router-dom';

export default function RoutePrivate() {
    const {isLogin} = Hooks.useUserInfo()

    return isLogin ? <Outlet/> : <Login/>
}