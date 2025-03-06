import {useUserInfo, useWallet} from "@matchain/matchid-sdk-react/hooks"
import {Input, Button} from "@matchain/matchid-sdk-react/components"
import React, {useEffect, useMemo, useState} from "react";
import {
    createPublicClient,
    formatUnits,
    parseUnits,
    parseGwei,
    Account,
    Transport,
    HttpTransportConfig, http, TransactionSerializable
} from "viem";
import {useQuery} from "@tanstack/react-query";
import {
    mainnet,
    arbitrum,
    arbitrumGoerli,
    arbitrumNova,
    arbitrumSepolia,
    avalanche,
    base,
    baseSepolia,
    baseGoerli,
    bsc,
    bscTestnet,
    goerli,
    linea,
    lineaGoerli,
    lineaSepolia,
    sepolia,
    polygonMumbai,
    polygon,
    polygonAmoy,
    zkSync,
} from 'viem/chains';
import {matchMain, matchTest} from "@/config/chains";
import useLocalStore from "@/store/useLocalStore";
import ButtonGroup from "@/components/ButtonGroup";
import Erc20Abi from "@/abi/erc20.json";
import ChainListModal from "@/pages/Wallet/components/ChainListModal";
import AssetListModal from "@/pages/Wallet/components/AssetListModal";
import ImportTokenListModal from "@/pages/Wallet/components/ImportTokenListModal";
import WalletChainListModal from "@/pages/Wallet/components/WalletChainListModal";
import MatchWallet from "@/pages/Wallet/components/MatchWallet";

const chainList = [
    mainnet,
    bsc,
    bscTestnet,
    matchMain,
    matchTest,
    arbitrum,
    arbitrumGoerli,
    arbitrumNova,
    arbitrumSepolia,
    avalanche,
    base,
    baseSepolia,
    baseGoerli,
    goerli,
    linea,
    lineaGoerli,
    lineaSepolia,
    sepolia,
    polygonMumbai,
    polygon,
    polygonAmoy,
    zkSync,
]

export default function Wallet() {
    const [modal, setModal] = useState<'chainList' | 'assetList' | 'importTokenList' | 'walletChainList' | '' >('')

    const {initChainId, setInitChainId} = useLocalStore()
    const {overview} = useUserInfo()

    const [message, setMessage] = useState('hello')
    const [toAddress, setToAddress] = useState('')
    const [toAmount, setToAmount] = useState('0.000001')
    const [data, setToData] = useState('0x')
    const {address, evmAccount, createWalletClient, walletReady} = useWallet()
    const chain = chainList.find((chain) => chain.id === initChainId)

    const walletClient = createWalletClient({
        chain: chain,
        transport: http(),
        // account:evmAccount
    })

    useEffect(() => {
        if (address && !toAddress) {
            setToAddress(address)
        }
    }, [address, toAddress]);


    const [hash, setHash] = useState('')
    const [transactionSign, setTransactionSign] = useState('')
    const [signature, setSignature] = useState('')

    const publicClient = createPublicClient({
        chain: chain,
        transport: http() as Transport,
    });

    const balanceQuery = useQuery({
        queryKey: ['balance', address],
        refetchInterval: 15_000,
        queryFn: async () => {
            return await publicClient.getBalance({address: address as `0x${string}`})
        }
    })
    //to eth
    const balanceEth = balanceQuery.data ? formatUnits(balanceQuery.data, 18) : 0

    const gasPriceQuery = useQuery({
        queryKey: ['gasPrice'],
        refetchInterval: 15_000,
        queryFn: async () => {
            return await publicClient.getGasPrice()
        }
    })

    useEffect(() => {
        gasPriceQuery.refetch()
        balanceQuery.refetch()
    }, [chain,address]);

    const onSign = async () => {
        if (!walletClient) return;
        const res = await walletClient.signMessage({
            message,
            account: evmAccount as Account
        })
        setSignature(res)
    }

    const onSignTransaction = async () => {
        if (!walletClient || !evmAccount) return
        try {

            const transaction = {
                to: toAddress as `0x${string}`,
                value: parseUnits(toAmount, 18),
                data: data as `0x${string}`,
                chain: chain,
            }
            const request = await walletClient.prepareTransactionRequest(transaction)
            const res = await evmAccount.signTransaction!(request as TransactionSerializable)
            setTransactionSign(res)
        } catch (e) {
            console.error(e)
        }
    }

    const onSendTransaction = async () => {
        if (!walletClient) return
        const res = await walletClient.sendTransaction({
            // account:evmAccount as Account,
            to: toAddress as `0x${string}`,
            value: parseUnits(toAmount, 18),
            data: data as `0x${string}`,
            chain: chain
        })
        setHash(res)
    }


    return <div>
        <ButtonGroup title={"Wallet Ready"}>
            {walletReady ? 'Ready' : 'Not Ready'}
        </ButtonGroup>

        <ButtonGroup title={"QueryList"}>
            <button className={`bg-gray-300 p-1 rounded`}
                    onClick={() => setModal('chainList')}>ChainList
            </button>
            <button className={`bg-gray-300 p-1 rounded`}
                    onClick={() => setModal('assetList')}>AssetList
            </button>
            <button className={`bg-gray-300 p-1 rounded`}
                    onClick={() => setModal('importTokenList')}>ImportTokenList
            </button>
            <button className={`bg-gray-300 p-1 rounded`}
                    onClick={() => setModal('walletChainList')}>WalletChainList
            </button>
        </ButtonGroup>
        <ButtonGroup title={"CreateWalletClient Chain"}>
            <select value={initChainId} onChange={(e) => setInitChainId(parseInt(e.target.value))}>
                {chainList.map((chain, index) => {
                    return <option key={index} value={chain.id}>{chain.name}({chain.id})</option>
                })}
            </select>
        </ButtonGroup>
        <ButtonGroup title={"DID"}>
            <div className={`flex-1 flex-wrap break-all`}>{overview?.did}</div>
        </ButtonGroup>
        <ButtonGroup title={"Ethereum address"}>
            <div className={`flex-1 flex-wrap break-all`}>{address}</div>
        </ButtonGroup>
        <ButtonGroup title={"Signature Message"}>
            <input className="border px-[8px]" type={'text'} placeholder={'message'} value={message}
                   onChange={(e) => setMessage(e.target.value)}/>
            <Button onClick={onSign} size={"sm"} disabled={!walletReady}>Sign message</Button>
        </ButtonGroup>
        <ButtonGroup title={"Signature Result"}>
            <div className={`flex-1 flex-wrap break-all`}>{signature || '-'}</div>
        </ButtonGroup>

        <div className={`text-ellipsis break-words`}>balance:{balanceQuery.data?.toString()} wei/{balanceEth} eth</div>
        <div className={`text-ellipsis break-words`}>gas price:{gasPriceQuery.data?.toString()} wei</div>

        <div className="text-bold">
            Send Transaction
        </div>
        <div>
            To Address:
            <input className="border" type={'text'} placeholder={'to address'} value={toAddress}
                   onChange={(e) => setToAddress(e.target.value)}/>
        </div>
        <div>
            Amount:
            <input className="border" type={'text'} placeholder={'amount'} value={toAmount}
                   onChange={(e) => setToAmount(e.target.value)}/>
        </div>
        <div>
            Data:
            <input className="border" type={'text'} placeholder={'data'} value={data}
                   onChange={(e) => setToData(e.target.value)}/>
        </div>
        <ButtonGroup>
            <Button onClick={onSignTransaction} size={"sm"} disabled={!walletReady}>Sign</Button>
            <Button onClick={onSendTransaction} size={"sm"} disabled={!walletReady}>Send</Button>
        </ButtonGroup>
        <ButtonGroup title={"TxSignature"}>
            <div className={`flex-1 flex-wrap break-all`}>{transactionSign || '-'}</div>
        </ButtonGroup>
        <ButtonGroup title={"TxHash"}>
            <div className={`flex-1 flex-wrap break-all`}>{hash || '-'}</div>
        </ButtonGroup>

        {modal == 'chainList' && <ChainListModal isOpen onClose={() => setModal('')}/>}
        {modal == 'walletChainList' && <WalletChainListModal isOpen onClose={() => setModal('')}/>}
        {modal == 'assetList' && <AssetListModal isOpen onClose={() => setModal('')}/>}
        {modal == 'importTokenList' && <ImportTokenListModal isOpen onClose={() => setModal('')}/>}

        <ERC20/>
        <MatchWallet/>
    </div>
}

function ERC20() {
    const {initChainId, erc20Address, setErc20Address} = useLocalStore()

    const {address, evmAccount, createWalletClient, walletReady} = useWallet()

    const chain = chainList.find((chain) => chain.id === initChainId)
    const publicClient = createPublicClient({
        chain: chain,
        transport: http() as Transport,
    });

    const decimalsQuery = useQuery({
        queryKey: ['erc20decimals', erc20Address],
        queryFn: async () => {
            return await publicClient.readContract({
                abi: Erc20Abi,
                address: erc20Address as `0x${string}`,
                functionName: 'decimals',
                args: []
            }) as number
        },
        enabled:!!erc20Address
    })

    const symbolQuery = useQuery({
        queryKey: ['erc20symbol', erc20Address],
        queryFn: async () => {
            return await publicClient.readContract({
                abi: Erc20Abi,
                address: erc20Address as `0x${string}`,
                functionName: 'symbol',
                args: []
            }) as string
        },
        enabled:!!erc20Address
    })

    const balanceQuery = useQuery({
        queryKey: ['erc20balance', address],
        refetchInterval: 15_000,
        queryFn: async () => {
            return await publicClient.readContract({
                abi:Erc20Abi,
                address:erc20Address as `0x${string}`,
                functionName:'balanceOf',
                args:[address]
            }) as bigint
        },
        enabled:!!erc20Address&&!!address
    })

    const balanceUnit = useMemo(()=>{
        if(!decimalsQuery.data) return ''
        if(!balanceQuery.data) return ''

        return formatUnits(balanceQuery.data,decimalsQuery.data)
    },[balanceQuery.data,decimalsQuery.data])

    // console.log(balanceQuery,symbolQuery,decimalsQuery)

    function Transfer(){
        const [to, setTo] = useState(address)
        const [hash, setHash] = useState('')
        const [amount, setAmount] = useState('0.0001')
        const [loading,setLoading] = useState(false)
        const onSend = async()=>{
            try{
                setLoading(true)
                if(!walletReady) throw new Error('wallet not ready')
                if(!evmAccount) throw new Error('account not ready')
                if(!erc20Address) throw new Error('erc20Address not ready')
                if(!to) throw new Error('to not ready')
                if(!amount) throw new Error('amount not ready')

                const walletClient = createWalletClient({
                    chain:chain,
                    transport:http(),
                })
                if(walletClient){

                    const hash = await walletClient?.writeContract({
                        address:erc20Address as `0x${string}`,
                        abi:Erc20Abi as any,
                        functionName:'transfer',
                        args:[to,parseUnits(amount,decimalsQuery.data||18)],
                    })
                    setHash(hash)
                }


            }catch(error:any){
                console.error(error)
                alert(error.message)
            }finally {
                setLoading(false)
            }
        }

        return <>
            <ButtonGroup title={"Transfer"}>
                <div className={`flex-1 flex-wrap break-all`}>
                    To Address:
                    <input className="border px-[8px]" type={'text'} placeholder={'address'} value={to}
                           onChange={(e) => setTo(e.target.value)}/>
                </div>
                <div className={`flex-1 flex-wrap break-all`}>
                    Amount:
                    <input className="border px-[8px]" type={'text'} placeholder={'amount'} value={amount}
                           onChange={(e) => setAmount(e.target.value)}/>
                </div>

            </ButtonGroup>

            <ButtonGroup title={"Transaction"}>
                <Button size={"sm"} loading={loading} onClick={onSend} disabled={!to||!amount||!walletReady}>Send</Button>
                <div className={`flex-1 flex-wrap break-all`}>{hash}</div>
            </ButtonGroup>
        </>
    }

    function Approve(){
        const [to, setTo] = useState(address)
        const [hash, setHash] = useState('')
        const [amount, setAmount] = useState('0.0001')
        const [loading,setLoading] = useState(false)
        const onSend = async()=>{
            try{
                setLoading(true)
                if(!walletReady) throw new Error('wallet not ready')
                if(!evmAccount) throw new Error('account not ready')
                if(!erc20Address) throw new Error('erc20Address not ready')
                if(!to) throw new Error('to not ready')
                if(!amount) throw new Error('amount not ready')

                const walletClient = createWalletClient({
                    chain:chain,
                    transport:http(),
                })
                if(walletClient){

                    const hash = await walletClient?.writeContract({
                        address:erc20Address as `0x${string}`,
                        abi:Erc20Abi as any,
                        functionName:'approve',
                        args:[to,parseUnits(amount,decimalsQuery.data||18)],
                    })
                    setHash(hash)
                }


            }catch(error:any){
                console.error(error)
                alert(error.message)
            }finally {
                setLoading(false)
            }
        }

        return <>
            <ButtonGroup title={"Approve"}>
                <div className={`flex-1 flex-wrap break-all`}>
                    To Address:
                    <input className="border px-[8px]" type={'text'} placeholder={'address'} value={to}
                           onChange={(e) => setTo(e.target.value)}/>
                </div>
                <div className={`flex-1 flex-wrap break-all`}>
                    Amount:
                    <input className="border px-[8px]" type={'text'} placeholder={'amount'} value={amount}
                           onChange={(e) => setAmount(e.target.value)}/>
                </div>

            </ButtonGroup>

            <ButtonGroup title={"Transaction"}>
                <Button size={"sm"} loading={loading} onClick={onSend} disabled={!to||!amount||!walletReady}>Send</Button>
                <div className={`flex-1 flex-wrap break-all`}>{hash}</div>
            </ButtonGroup>
        </>
    }

    return <div className="mt-[20px]">
        <ButtonGroup title={"ERC20"}></ButtonGroup>
        <ButtonGroup title={"Contract Address"}>
            <input className="border px-[8px]" type={'text'} placeholder={'contact'} value={erc20Address}
                   onChange={(e) => setErc20Address(e.target.value)}/>
        </ButtonGroup>
        <ButtonGroup title={"Info"}>
            <div className={`flex-1 flex-wrap break-all`}>Symbol:{symbolQuery.data}</div>
            <div className={`flex-1 flex-wrap break-all`}>Decimals:{decimalsQuery.data}</div>
        </ButtonGroup>
        <ButtonGroup title={"Balance"}>
            <div className={`flex-1 flex-wrap break-all`}>{balanceQuery.data?.toString()}</div>
            <div className={`flex-1 flex-wrap break-all`}>{balanceUnit} {symbolQuery.data}</div>
        </ButtonGroup>
        <Transfer/>
        <Approve/>
    </div>
}