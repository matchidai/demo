import {ContactList,ContactCard} from "@matchain/matchid-sdk-react/components"
import {Field, Input, Button, Radio} from "@matchain/matchid-sdk-react/ui"
import {Api,Icon} from "@matchain/matchid-sdk-react"
import React, {useCallback, useEffect, useState} from "react";
import {debounce} from "lodash";
import {useToast} from "@matchain/matchid-sdk-react/hooks";

const {contact} = Api

function ContactSearch() {
    const [value, setValue] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [loading,setLoading] = useState(false)
    const [searching,setSearching] = useState(false)
    const toast = useToast()
    const debouncedSetKeyword = useCallback(
        debounce((newKeyword) => {
            setSearchValue(newKeyword);
        }, 1500),
        []
    );

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        debouncedSetKeyword(e.target.value);
        setSearching(true)
    }

    const searchQuery = contact.useContactSearch(searchValue)

    useEffect(() => {
        if(searchQuery.isFetched){
            setSearching(false)
        }
    }, [searchQuery.isFetched]);


    const onAdd = async()=>{
        if(!searchQuery.data){
            return
        }
        setLoading(true)
        try{
            await contact.addContact(searchQuery.data)
            toast.success("Add Success")
        }catch(error:any){
            toast.success(error.message)
            console.error(error)
        }finally {
            setLoading(false)
        }
    }
    return <div className={`flex gap-4 flex-col`}>
        <Field label={"Search"}>
            <Input placeholder={"Input address or MatchID"} value={value} onChange={onChange}/>
        </Field>
        {(searchQuery.data || searching )&& <div className={"break-all"}>
            <ContactCard loading={searching} data={!searching ?(searchQuery.data||undefined) : undefined}
                action={()=>{
                    return searchQuery.data && <Button size="sm" onClick={onAdd} disabled={!searchQuery.data} loading={loading}>Add</Button>
                }}
            />
        </div>}
    </div>
}

export default function Contact() {
    const [contactType, setContactType] = useState<"Friend" | "Requests">("Friend")

    return <div className={`grid md:grid-cols-2 gap-4`}>
        <div>
            <Field label={"Type"}>
                <div className={`flex gap-4`}>
                    <div onClick={() => setContactType("Friend")}
                         className={`flex gap-2 items-center cursor-pointer`}>
                        <Radio checked={contactType == "Friend"}/>
                        Friend
                    </div>
                    <div onClick={() => setContactType("Requests")}
                         className={`flex gap-2 items-center cursor-pointer`}>
                        <Radio checked={contactType == "Requests"}/>
                        Requests
                    </div>
                </div>
            </Field>
            <ContactList type={contactType}/>
        </div>
        <ContactSearch/>
    </div>
}