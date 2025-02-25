import { ModalWithHeader } from '@matchain/matchid-sdk-react/components';
import React from "react";
import QueryDisplay from "@/components/QueryDisplay";
import {Api} from "@matchain/matchid-sdk-react";
export default function ChainListModal({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) {
    const query = Api.wallet.useChainListQuery()

    return <ModalWithHeader isOpen={isOpen} onClose={onClose} title={"ChainListQuery"}>
        <QueryDisplay query={query} />
    </ModalWithHeader>
}