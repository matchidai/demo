import {AlphaAvatar} from "@matchain/matchid-sdk-react/ui"
import ButtonGroup from "@/components/ButtonGroup";
export default function AlphaAvatarDemo(){
    const name = "MatchID"

    return <ButtonGroup title={"AlphaAvatar"}>
        <AlphaAvatar name={name} size={"sm"}/>
        <AlphaAvatar name={name} size={"default"}/>
        <AlphaAvatar name={name} size={"lg"}/>
    </ButtonGroup>
}