import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {LocaleType} from "@matchain/matchid-sdk-react/types";

interface StoreState {
    appid: string
    endpoints: {
        back: string;
        auth: string;
    }
    locale: LocaleType;


    setAppid: (appid: string) => void;
    setEndpoints: (endpoints: StoreState['endpoints']) => void
    setLocale: (locale: LocaleType) => void

    initChainId: number;
    setInitChainId: (initChainId: number) => void

    erc20Address: string;
    setErc20Address: (erc20Address: string) => void;

}

const persistedState = persist<StoreState>(
    set => ({
        appid: '',
        endpoints: {
            back: "https://api.matchid.ai/",
            auth: "https://auth.matchid.ai/"
        },
        locale: 'en',
        setAppid: (appid: string) => set({appid: appid}),
        setEndpoints: (endpoints: StoreState['endpoints']) => set({endpoints}),
        setLocale: (locale: LocaleType) => set({locale}),

        initChainId:1,
        setInitChainId: (initChainId: number) => set({initChainId}),

        erc20Address: '',
        setErc20Address: (erc20Address: string) => set({erc20Address})
    }),
    {name: 'match-example-local'}
);

const useLocalStore = create(devtools(persistedState));

export const localStore = useLocalStore;

export default useLocalStore;
