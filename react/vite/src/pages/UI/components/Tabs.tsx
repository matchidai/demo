import {useState} from "react";
import {Tabs} from "@matchain/matchid-sdk-react/ui"
export default function TabsDemo(){
    const list = ['Tab1', 'Tab2', 'Tab3']
    const [activeTab, setActiveTab] = useState(0)
    return <div>
        <Tabs tabs={list} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <div>
            {list.map((tab, index) => {
                return <div key={index} style={{display: activeTab === index ? 'block' : 'none'}}>
                    {tab}
                </div>
            })}
        </div>
    </div>


}