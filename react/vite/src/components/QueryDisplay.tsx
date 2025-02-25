import {Button} from "@matchain/matchid-sdk-react/components";
import React from "react";

export default function QueryDisplay(
    {
        query
    }: {
        query: any
    }
) {
    const keys = Object.keys(query)
    return <div className={`max-h-[60vw] overflow-scroll`}>
        {keys.map((key) => {
            return <div key={key} className={`flex gap-[12px]`}>
                <div className={"w-[110px] break-all"}>{key}</div>
                <div className={`flex-1 flex-wrap break-all`}>{
                    typeof query[key] === 'function' ? <Button size="sm" onClick={() => {
                            query[key]()
                        }}>Run</Button> :
                        JSON.stringify(query[key])}</div>
            </div>
        })}
    </div>

}