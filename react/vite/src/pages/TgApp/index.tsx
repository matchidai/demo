import {Button} from "@matchain/matchid-sdk-react/ui";
import {useUserInfo, useWallet} from "@matchain/matchid-sdk-react/hooks";
import {useState} from "react";

export default function TgApp(){
    const {login,isLogin,getAuthInfo} = useUserInfo()
    const {address} = useWallet()
    const [authInfo,setAuthInfo] = useState<any>()
    const telegramLogin = async () => {
        return login('telegram')
    }
    const telegramAuth = async () => {
        try{
            const res = await getAuthInfo('telegram')
            setAuthInfo(JSON.stringify(res))
        }catch(error:any){
            setAuthInfo('error:'+error.message)
        }

    }
    return <div className={`flex flex-col gap-[10px]`}>
        <div className={`flex`}>
            <Button onClick={telegramLogin} disabled={isLogin}>1.Login by Telegram</Button>
        </div>
        <div className={"text-green-500"}>
            Code: login('telegram')
        </div>
        <div className={`break-all`}>
            2.Auto generate wallet:{address ||'-'}
        </div>
        <div>
            <Button onClick={telegramAuth} disabled={!isLogin}>3.Get Telegram auth info</Button>
        </div>
        <div className={"text-green-500"}>
            Code: getAuthInfo('telegram')
        </div>
        <div className={`break-all`}>
            AuthResult:{authInfo||'-'}
        </div>
        <div className={`break-all`}>
            4.Send auth result to server and verify.<a href={"https://docs.matchid.ai/api/method/auth/verify.html"} target={"_blank"} className={'text-red-600'}>Click here to read api</a>
        </div>
    </div>
}