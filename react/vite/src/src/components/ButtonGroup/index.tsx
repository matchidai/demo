import {PropsWithChildren} from "react";

export default function ButtonGroup({children,title}: PropsWithChildren&{
    title?: string
}) {
    return <div className={`flex gap-[16px] flex-wrap items-center`}>
        {title&&<div className={`text-xl`}>{title}</div>}
        {children}
    </div>
}