import React, {useState} from "react";
import {CEXList, LOGIN_METHOD_MAP, LoginMethod, LoginMethodList, RecommendLoginMethodList, WalletList} from "@/config";
import {CEXType, LoginMethodType} from "@matchain/matchid-sdk-react/types";
import {useMatchEvents, useUserInfo, useWallet} from "@matchain/matchid-sdk-react/hooks";
import {
    LoginButton,
    UsernameModal,
} from "@matchain/matchid-sdk-react/components";
import BindListModal from "@/pages/User/components/BindListModal";
import PohListModal from "@/pages/User/components/PohListModal";
import ChainListModal from "@/pages/Wallet/components/ChainListModal";
import ButtonGroup from "@/components/ButtonGroup";


function LoginContent() {
    const {
        token,
        logout,
        username,
        refreshOverview,
        did,
        address,
        bind,
        auth,
        bindCex,
        getAuthInfo
    } = useUserInfo();
    const [usernameOpen, setUsernameOpen] = useState(false)
    const [modal, setModal] = useState<'bindList' | 'pohList' | ''>('')
    const refreshOv = async () => {
        await refreshOverview()
        alert('refreshed')
    }

    const onAuth = async () => {
        try {
            const res = await auth()
            console.log('auth', res)
        } catch (e) {
            console.error('auth', e)
        }
    }

    return <div className={`flex flex-col gap-[10px]`}>
        <h1 className={`text-2xl`}>You are already logged in</h1>
        <div className={`text-ellipsis break-words`}>token:{token}</div>
        <div className={`text-ellipsis break-words`}>username:{username}</div>
        <div className={`text-ellipsis break-words`}>did:{did}</div>
        <div className={`text-ellipsis break-words`}>address:{address}</div>

        <ButtonGroup title={"User"}>
            <button className={`bg-gray-300 p-1 rounded`}
                    onClick={() => setUsernameOpen(true)}>Set username
            </button>
            <button className={`bg-gray-300 p-1 rounded`}
                    onClick={onAuth}>Third party auth
            </button>
            <button className={`bg-gray-300 p-1 rounded`}
                    onClick={refreshOv}>Refresh Overview
            </button>
            <button className={`bg-gray-300 p-1 rounded`}
                    onClick={logout}>Logout
            </button>
            <UsernameModal isOpen={usernameOpen} onClose={() => setUsernameOpen(false)} onBack={() => {
                console.log('set username modal back event')
                setUsernameOpen(false)
            }} onSuccess={() => {
                alert('set username success')
                setUsernameOpen(false)
            }}/>
        </ButtonGroup>
        <ButtonGroup title={"Bind"}>
            {
                LoginMethod.map((method) => {
                    return <button key={method} className={`bg-gray-300 p-1 capitalize rounded`}
                                   onClick={() => bind(method as LoginMethodType)}>{method}
                    </button>
                })
            }
        </ButtonGroup>
        <ButtonGroup title={"Bind CEX"}>
            {
                CEXList.map((method) => {
                    return <button key={method} className={`bg-gray-300 p-1 capitalize rounded`}
                                   onClick={() => bindCex(method as CEXType)}>CEX {method}
                    </button>
                })
            }
        </ButtonGroup>
        <ButtonGroup title={"getAuthInfo"}>
            {
                Object.keys(LOGIN_METHOD_MAP).map((method) => {
                    return <button key={method} className={`bg-gray-300 p-1 capitalize rounded`}
                                   onClick={() => getAuthInfo(method as keyof typeof LOGIN_METHOD_MAP)}>{LOGIN_METHOD_MAP[method as keyof typeof LOGIN_METHOD_MAP]}
                    </button>
                })
            }
        </ButtonGroup>

        <ButtonGroup title={"QueryList"}>
            <button className={`bg-gray-300 p-1 rounded`}
                    onClick={() => setModal('bindList')}>BindList
            </button>
            <button className={`bg-gray-300 p-1 rounded`}
                    onClick={() => setModal('pohList')}>PohList
            </button>
        </ButtonGroup>

        <BindListModal isOpen={modal == 'bindList'} onClose={() => setModal('')}/>
        <PohListModal isOpen={modal == 'pohList'} onClose={() => setModal('')}/>
    </div>

}

export default function User() {
    useMatchEvents({
        onLogin: (data) => {
            console.log('useMatchEvents.onLogin', data)
        },
        onLogout: () => {
            console.log('useMatchEvents.onLogout')
        },
        onBind: (data) => {
            console.log('useMatchEvents.onBind', data)
        }
    })
    return <LoginContent/>
}