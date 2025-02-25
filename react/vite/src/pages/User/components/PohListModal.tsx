import { ModalWithHeader } from '@matchain/matchid-sdk-react/components';
import React from "react";
import QueryDisplay from "@/components/QueryDisplay";
import {Api} from "@matchain/matchid-sdk-react";
export default function PohListModal({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) {
    const pohListQuery = Api.poh.usePohList()
    return <ModalWithHeader isOpen={isOpen} onClose={onClose} title={"PohListQuery"}>
        <QueryDisplay query={pohListQuery} />
    </ModalWithHeader>
}