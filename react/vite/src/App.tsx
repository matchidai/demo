import React, {useEffect, useMemo, useState} from "react";
import {MatchProvider} from "@matchain/matchid-sdk-react";
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';
import Home from "./pages/Home";
import './app.css'
import User from "./pages/User";
import "@matchain/matchid-sdk-react/index.css"
import Wallet from "@/pages/Wallet";
import {LocaleList} from "@/config";
import {LocaleType} from "@matchain/matchid-sdk-react/types";
import {useUserInfo} from "@matchain/matchid-sdk-react/hooks";
import RoutePrivate from "@/components/RoutePrivate";
import useLocalStore from "@/store/useLocalStore";
import {LoginButton}     from "@matchain/matchid-sdk-react/components";


function Nav() {
    const {isLogin} = useUserInfo()
    const location = useLocation()
    const menus = useMemo(() => {
        const list: {
            name: string,
            url: string
            onActive: boolean
            hidden?: boolean
        }[] = [
            {
                name: 'Home',
                url: '/',
                onActive: location.pathname === '/'
            },
            {
                name: 'User',
                url: '/user',
                onActive: location.pathname === '/user'
            },
            {
                name: 'Wallet',
                url: '/wallet',
                onActive: location.pathname === '/wallet',
                hidden: !isLogin
            }
        ]
        return list
    }, [location.pathname, isLogin])
    return <nav className={`text-2xl mb-5 p-2 text-red-600 flex gap-10`}>
        {menus.map((menu) => {
            return <Link key={menu.url} to={menu.url}
                         className={`text-2xl ${menu.onActive ? 'text-red-600' : 'text-gray-400'}`}>{menu.name}</Link>
        })}
        <LoginButton/>
    </nav>
}

function RouterApp() {
    const {appid, setAppid, locale, setLocale, endpoints, setEndpoints} = useLocalStore()

    return <Router>
        <div className={`mb-2 p-2 flex gap-2 flex-col`}>
            <div>
                <label>Appid:</label>
                <input value={appid} placeholder={"Appid"} className={"border-solid border"} onChange={(ele) => {
                    setAppid(ele.target.value)
                }}/></div>
            <div>
                <label>AuthEndpoint:</label>
                <input value={endpoints?.auth || ''} placeholder={"Auth Endpoint"} className={"border-solid border"}
                       onChange={(ele) => {
                           setEndpoints({...endpoints, auth: ele.target.value})
                       }}/>
            </div>
            <div>
                <label>BackEndpoint:</label>
                <input value={endpoints?.back || ''} placeholder={"Back Endpoint"} className={"border-solid border"}
                       onChange={(ele) => {
                           setEndpoints({...endpoints, back: ele.target.value})
                       }}/>
            </div>
            <div>
                <label>Locale:</label>
                <select onChange={(ele) => {
                    setLocale(ele.target.value as LocaleType)
                }} value={locale}>
                    {LocaleList.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
            </div>
        </div>
        <Nav/>
        <div className={`p-4`}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route element={<RoutePrivate/>}>
                    <Route path="/user" element={<User/>}/>
                    <Route path="/wallet" element={<Wallet/>}/>
                </Route>
            </Routes>
        </div>
    </Router>
}

function App() {
    const {appid, locale, endpoints} = useLocalStore()

    return <MatchProvider
        appid={appid}
        endpoints={endpoints}
        locale={locale}
        events={{
            onLogin: (data) => {
                console.log('events.onLogin', data)
            },
            onLogout: () => {
                console.log('events.onLogout')
            }
        }}
        wallet={{
            type: "UserPasscode"
        }}
    >
        <RouterApp/>
    </MatchProvider>;
}

export default App;
