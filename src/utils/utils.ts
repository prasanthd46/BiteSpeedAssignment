import { contactRecord, contactResponseType } from "../common/types";
import {client} from  "./db" 

async function findMatchingContacts(email:string | null , phoneNumber : string | null ):Promise<contactRecord[]>{
    const result = await client.query(
            `select * from contacts where email = $1 OR phonenumber = $2 ORDER BY createdAt ASC `,[email,phoneNumber]
        )
      console.log(result.rows)
    return result.rows;
}

async function insertContact( email:string | null , phoneNumber: string | null , linkedId : number | null , linkedPrecedence : string):Promise<contactRecord>{
     
        const result =  await client.query(
              `INSERT INTO contacts (email, phoneNumber, linkedId, linkPrecedence)
               VALUES ($1, $2, $3, $4) RETURNING *`,
              [email, phoneNumber,linkedId,linkedPrecedence]
            );
        return result.rows[0]
        
}

async function  updateContactToSecondary(primaryId:number ,secondaryId:number){
    await client.query(
        `UPDATE contacts SET linkprecedence = 'secondary',updatedat = NOW(), linkedid = $1 WHERE id = $2`,
        [primaryId, secondaryId]
    )
}

async function updateLinkedSecondaries(newPrimaryId: number, oldPrimaryId: number) {
    await client.query(
        `UPDATE contacts SET linkedid = $1, updatedat = NOW() WHERE linkedId = $2`,
        [newPrimaryId, oldPrimaryId]
    )
}

async function getAllGroupedContacts(primaryId:number):Promise<contactRecord[]>{
    
    const result =  await client.query(`Select * from Contacts where linkedid = $1 OR id = $1 ORDER BY createdAt ASC`,[primaryId])

    return result.rows
}

function contactResponse(contacts: contactRecord[]):contactResponseType {
  if (!contacts.length) throw new Error('No contacts to build response');

  
  const primary = contacts.find(c => c.linkprecedence === 'primary') || contacts[0];

  const emails = Array.from(new Set(contacts.map(c =>  c.email).filter(Boolean))) as string[]
  const phoneNumbers  = Array.from(new Set(contacts.map(c => c.phonenumber).filter(Boolean))) as string[]

  const secondaryContactIds = contacts
    .filter(c => c.linkprecedence === 'secondary')
    .map(c => c.id);

  return {
    contact: {
      primaryContatctId: primary.id,
      emails,
      phoneNumbers,
      secondaryContactIds
    }
  };
}



export {
    updateContactToSecondary,
    updateLinkedSecondaries,
    insertContact,
    findMatchingContacts,
    getAllGroupedContacts,
    contactResponse
}