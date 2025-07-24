export interface contactRecord {
    id                   : number                   
    phonenumber          : string | null 
    email                : string | null
    linkedid             : number | null
    linkprecedence       : 'primary' | 'secondary'
    createdAt            :  Date
    updatedAt            :  Date          
    deletedAt            :  Date | null
}


export interface contactResponseType {
    
        contact: {
          primaryContatctId: number,
          emails : string[],
          phoneNumbers : string[],
          secondaryContactIds : number[]
        };
    
}
