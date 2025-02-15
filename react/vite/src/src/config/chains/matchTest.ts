
import { defineChain } from "viem"

export const matchTest = /*#__PURE__*/ defineChain({
    id: 699,
    name: "MatchTest",
    nativeCurrency: { name: "Match Coin", symbol: "BNB", decimals: 18 },
    rpcUrls: {
        default: {
            http: ["https://testnet-rpc.matchain.io"],
        },
    },
    blockExplorers: {
        default: {
            name: "Matchscan",
            url: "https://testnet.matchscan.io/",
            apiUrl: "https://testnet.matchscan.io/api",
        },
    },
    iconUrl: "https://match-website-cdn.s3.ap-northeast-1.amazonaws.com/tgapp/logo_black.png",
    contracts: {
        multicall3: {
            address: "0xca11bde05977b3631167028862be2a173976ca11",
            blockCreated: 751532,
        },
        ensRegistry: { address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" },
        ensUniversalResolver: {
            address: "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC",
            blockCreated: 5_317_080,
        },
    },
    // testnet: true,
});