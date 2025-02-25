import { ModalWithHeader } from '@matchain/matchid-sdk-react/components';
import React from "react";
import QueryDisplay from "@/components/QueryDisplay";
import {Api} from "@matchain/matchid-sdk-react";
import useLocalStore from "@/store/useLocalStore";
export default function ImportTokenListModal({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) {
    const {initChainId} = useLocalStore()
    const query = Api.wallet.useImportTokenListQuery({
        chainId:initChainId
    })

    return <ModalWithHeader isOpen={isOpen} onClose={onClose} title={"ImportTokenListQuery"}>
        <QueryDisplay query={query} />
    </ModalWithHeader>
}