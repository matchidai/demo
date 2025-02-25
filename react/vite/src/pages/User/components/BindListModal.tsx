import { ModalWithHeader } from '@matchain/matchid-sdk-react/components';
import React from "react";
import QueryDisplay from "@/components/QueryDisplay";
import {Api} from "@matchain/matchid-sdk-react";
export default function BindListModal({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) {
    const bindListQuery = Api.bind.useBindList()
    return <ModalWithHeader isOpen={isOpen} onClose={onClose} title={"BindListQuery"}>
        <QueryDisplay query={bindListQuery} />
    </ModalWithHeader>
}