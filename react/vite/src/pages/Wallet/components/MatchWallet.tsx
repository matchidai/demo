import {
    useMatchChain,
    useMatchWallet,
    useMatchWalletAssets,
    useModal,
    useMatchWalletAssetList
} from "@matchain/matchid-sdk-react/hooks";
import {Button} from "@matchain/matchid-sdk-react/ui";
import {WalletAsset, TokenDetail, TransactionList} from "@matchain/matchid-sdk-react/components";
import ButtonGroup from "@/components/ButtonGroup";
import {WalletAssetMergeType} from "@matchain/matchid-sdk-react/types";

export default function MatchWallet() {
    const chain = useMatchChain()
    const wallet = useMatchWallet()
    const modal = useModal()
    const onAssetClick = (asset: WalletAssetMergeType) => {
        return () => {
            modal.show((props) => {
                return <TokenDetail onClose={props.close} token={asset}/>
            })
        }
    }
    const walletAssets = useMatchWalletAssets()
    const matchWalletAssetList = useMatchWalletAssetList({
        list: walletAssets.mergedAssets
    })
    const balance = matchWalletAssetList.list.reduce((pre, cur) => {
        return pre + (cur.value || 0)
    }, 0)

    return (
        <div className={"mt-[50px]"}>
            <ButtonGroup title={"CustomWalletUI"}></ButtonGroup>
            <div className={`flex gap-[10px] break-all`}>
                <span>matchWalletAssetList.isFetched:{matchWalletAssetList.isFetched.toString()}</span>
                <span>walletAssets.assetListQuery.isFetched:{walletAssets.assetListQuery.isFetched.toString()}</span>
                <span>walletAssets.importTokenQuery.isFetched:{walletAssets.importTokenQuery.isFetched.toString()}</span>
                <span>matchWalletAssetList.nativeBalanceQuery.isFetched:{matchWalletAssetList.nativeBalanceQuery.isFetched.toString()}</span>
                <span>matchWalletAssetList.erc20BalanceQuery.isFetched:{matchWalletAssetList.erc20BalanceQuery.isFetched.toString()}</span>
                <span>balance:{balance}</span>
            </div>
            <ButtonGroup>
                <Button size={"sm"} onClick={chain.showChangeNetwork}>{chain.chain?.id}:{chain.chain?.name}</Button>
                <Button size={"sm"} onClick={wallet.showReceiveModal}>ShowReceive</Button>
                <Button size={"sm"} onClick={wallet.showImportTokenModal}>showImportToken</Button>
                <Button size={"sm"} onClick={wallet.showSendListModal}>showSendListModal</Button>
            </ButtonGroup>
            <div className={`mt-[100px] gap-[20px] grid grid-cols-2`}>
                <WalletAsset onAssetClick={onAssetClick}/>
                <TransactionList/>
            </div>

        </div>
    )
}