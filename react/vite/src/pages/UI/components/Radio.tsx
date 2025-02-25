import {Radio} from "@matchain/matchid-sdk-react/ui";
import ButtonGroup from "@/components/ButtonGroup";
import {useState} from "react";

export default function RadioDemo(){
    const [checked,setChecked] = useState(false)
    return <ButtonGroup title={"Radio"}>
        <Radio checked={checked} onChange={()=>{
            setChecked(true)
        }}/>
        <Radio checked={!checked} onChange={()=>{
            setChecked(false)
        }}/>
    </ButtonGroup>
}