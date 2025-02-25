import { ModalWithHeader } from '@matchain/matchid-sdk-react/components';
import React from "react";
import QueryDisplay from "@/components/QueryDisplay";
import {Api} from "@matchain/matchid-sdk-react";
import useLocalStore from "@/store/useLocalStore";
export default function AssetListModal({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) {
    const {initChainId} = useLocalStore()
    const query = Api.wallet.useAssetListQuery({
        chainId:initChainId
    })

    return <ModalWithHeader isOpen={isOpen} onClose={onClose} title={"AssetListQuery"}>
        <QueryDisplay query={query} />
    </ModalWithHeader>
}