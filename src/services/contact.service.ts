import { QueryResult } from "pg"
import { client } from "../utils/db"

import { contactResponse, findMatchingContacts, getAllGroupedContacts, insertContact, updateContactToSecondary, updateLinkedSecondaries } from "../utils/utils"
import { contactResponseType } from "../common/types"

export const processContact = async(email:string | null , phoneNumber : string | null):Promise<contactResponseType> =>{
       
    const result = await findMatchingContacts(email,phoneNumber)

    const strictMatchingContacts = result.filter((obj) => (obj.email == email && obj.phonenumber == phoneNumber)) 

    if(strictMatchingContacts.length>0){
        const id = strictMatchingContacts[0].linkedid?? strictMatchingContacts[0].id
        const group = await getAllGroupedContacts(id)
        return contactResponse(group);
    }

    if (result.length === 0) { 
        const result = await insertContact(email,phoneNumber,null,'primary')
        const id = result?.id
        const group = await getAllGroupedContacts(id)
        return contactResponse(group);
    }

    const initialItem = result[0]
    const primaries = result.filter((obj) => obj.linkprecedence == 'primary')
    
    
    if(initialItem.linkprecedence == 'primary'){
        if(primaries.length>1){
            const nextItem = primaries[1]
            await updateContactToSecondary(initialItem.id,nextItem.id)
     
            const secondaries = await client.query(`select * from contacts where linkedId = $1 LIMIT 1`,[nextItem.id])
            
            if( secondaries.rows.length > 0 ){
                
                await updateLinkedSecondaries(initialItem.id,nextItem.id)
            }
        }else{
            await insertContact(email,phoneNumber,initialItem.id,'secondary')
        }
    }else{
        if(primaries.length == 1 ){
            const nextItem = primaries[0]
            await updateContactToSecondary(initialItem.linkedid as number ,nextItem.id)
            
            const secondaries = await client.query(`select * from contacts where linkedId = $1 LIMIT 1`,[nextItem.id])
            
            if( secondaries.rows.length > 0 ){
                await updateLinkedSecondaries(initialItem.linkedid as number ,nextItem.id)
            }
        }else{
            await insertContact(email,phoneNumber,initialItem.linkedid,'secondary')
        }
    }

    const respPrimaryId = initialItem.linkedid ?? initialItem.id;
    const group = await getAllGroupedContacts(respPrimaryId);
    return contactResponse(group);
}