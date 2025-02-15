import React from "react";
import {Hooks,Components} from "@matchain/matchid-sdk-react";
import {LoginMethod, WalletList} from "@/config";
import {LoginMethodType} from "../../../../src/types/types";
const { useUserInfo} = Hooks
const {EmailModal,LoginModal,LoginBox,LoginPanel} = Components
export default function Login(){
    const {
        loginByEmail,
        getLoginEmailCode,
        login,
    } = useUserInfo();
    const [email, setEmail] = React.useState('')
    const [code, setCode] = React.useState('')
    const [emailOpen, setEmailOpen] = React.useState(false)
    const [loginOpen, setLoginOpen] = React.useState(false)


    return (
        <div className={`flex flex-col gap-10`}>
            <div className={`flex gap-5 flex-wrap`}>
                <button className={`bg-gray-300 p-1 rounded`}
                        onClick={() => setLoginOpen(true)}>Open Modal
                </button>
                <button className={`bg-gray-300 p-1 rounded`}
                        onClick={() => setEmailOpen(true)}>Email
                </button>
                {
                    LoginMethod.map((method) => {
                        return <button key={method} className={`bg-gray-300 p-1 capitalize rounded`}
                                       onClick={() => login(method as LoginMethodType)}>{method}
                        </button>
                    })
                }
                <EmailModal isOpen={emailOpen} onClose={() => setEmailOpen(false)} onBack={() => {
                    console.log('input email modal back event')
                    setEmailOpen(false)
                }}/>


                <LoginModal isOpen={loginOpen} walletMethods={WalletList} onClose={() => setLoginOpen(false)} methods={[
                    'telegram',
                    'twitter',
                    'discord',
                    'github',
                    'facebook',
                    'youtube'
                ]}/>

            </div>
            <div className={`flex gap-5`}>
                <input type={"text"} className={`border`} placeholder={"email"}
                       onChange={(e) => setEmail(e.target.value)} value={email}/>
                <button className={`bg-gray-300 p-1 rounded`}
                        onClick={() => getLoginEmailCode(email)}>Send
                </button>
            </div>
            <div className={`flex gap-5`}>
                <input type={"text"} className={`border`} placeholder={"code"}
                       onChange={(e) => setCode(e.target.value)} value={code}/>
                <button className={`bg-gray-300 p-1 rounded`}
                        onClick={() => loginByEmail({email, code})}>Login
                </button>
            </div>
            <div className={`font-bold text-xl`}>Components</div>
            <div className={`font-bold text-lg`}>LoginBox</div>
            <div className={`bg-gray-100 p-10`}>
                <div className={`bg-white`}><LoginBox  walletMethods={["evm","sol"]}/></div>
            </div>
            <div className={`font-bold text-lg`}>LoginPanel</div>
            <div className={`bg-gray-100 p-10`}>
                <div className={`bg-white`}><LoginPanel onClose={() => console.log('onLoginPanelClose')} methods={['telegram','twitter','discord','github','facebook','youtube']}/></div>
            </div>
        </div>
    );
}