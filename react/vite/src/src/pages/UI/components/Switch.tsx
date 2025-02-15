import {Switch} from "@matchain/matchid-sdk-react/ui"
import ButtonGroup from "@/components/ButtonGroup";
import {useState} from "react";
export default function SwitchDemo(){
    const [checked,setChecked] = useState(false)

    return <ButtonGroup title={"Switch"}>
        <Switch checked={checked} onChange={(v)=>setChecked(v)}/>
        <Switch loading checked={checked} onChange={(v)=>setChecked(v)}/>
        <Switch size={"sm"} checked={checked} onChange={(v)=>setChecked(v)}/>
        <Switch disabled checked={checked} onChange={(v)=>setChecked(v)}/>
    </ButtonGroup>
}