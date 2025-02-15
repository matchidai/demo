import {useMatch} from "@matchain/matchid-sdk-react";
import {useMemo} from "react";
function DisplayConfig({
                           label,
                           value
                       }:{
    label:string,
    value:any
}){
    const RenderValue = useMemo(()=>{
        const type = typeof value;
        if(type === "object"){
            return JSON.stringify(value);
        }
        if(type==='function'){
            return <span className={`text-green-500`}>function</span>
        }
        return value;
    },[value])

    return <div className={`grid grid-cols-12 gap-4`}>
        <div className={`col-span-4 px-2`}>{label}</div>
        <div className={`col-span-8 px-2 text-ellipsis`}>{RenderValue}</div>
    </div>
}
export default function Home(){
    const config = useMatch();
    const keyList = Object.keys(config) as Array<keyof typeof config>;
    return <div className={``}>
        {
            keyList.map((key)=>{
                return <DisplayConfig key={key} label={key} value={config[key]}/>
            })
        }
    </div>
}