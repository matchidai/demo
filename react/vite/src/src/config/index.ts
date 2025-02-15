import {LoginMethodType, WalletType,RecommendLoginMethodType,OtherLoginMethodType} from "@matchain/matchid-sdk-react/types";

export const LoginMethod = [
    "wallet",
    'evm',
    'sol',
    'tron',
    'btc',
    'ton',
    'twitter',
    'google',
    'telegram',
    'github',
    'discord',
    'linkedin',
    'facebook',
    "youtube"
]
export const LocaleList = [
    "en", "zh", "tw", "fr", "ja", "ko", "vi", "es", "pt"
]

export const CEXList = [
    "Gate", "Coinbase", "Kucoin", 'Bitget', 'OKX', 'Bybit', 'Binance']

export const WalletList:WalletType[] = [
    'btc', 'sol', 'evm', 'tron',"ton"
]
export const LoginMethodList : OtherLoginMethodType[] = ['twitter' , 'discord', 'github', 'telegram' ,'linkedin' , 'facebook' ,'youtube']

export const RecommendLoginMethodList:RecommendLoginMethodType[] = ["wallet","email","google"]

export const LOGIN_METHOD_MAP = {
    email: 'Email',
    evm: "EVM",
    sol: "SOL",
    btc: "BTC",
    ton: "TON",
    tron: "TRON",
    google: "Google",
    facebook: "Facebook",
    x: "X",
    telegram: "Telegram",
    github: "Github",
    discord: "Discord",
    linkedin: "LinkedIn",
    youtube: "Youtube",
}