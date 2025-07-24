import {Client } from "pg"
import dotenv, { parse } from 'dotenv';
dotenv.config();

export const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE , 
    password: process.env.PASSWORD , 
    port: parseInt(process.env.DB_PORT || '5432'), 
})


export const connectDB = async() => {
    try{
        await client.connect()
        console.log("Connected Db")
    }catch(err){
        console.error("Error in connecting db",err)
    }
}
