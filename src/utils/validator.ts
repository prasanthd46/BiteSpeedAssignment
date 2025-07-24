export function validateContactRequestBody(body:any):{email:string | null , phoneNumber : string | null}{
    const email = body.email?? null
    const phoneNumber = body.phoneNumber ?? null
    if(!email && !phoneNumber ){
        throw { status:400,message : "Email or Phonenumber is required "}
    } 
    return {email,phoneNumber}
}


