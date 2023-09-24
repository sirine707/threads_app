import mongoose from 'mongoose';
import { set } from 'zod';
let isConnected =false
export const connectToDB=async ()=>{
mongoose.set('strictQuery',true)
if(!process.env.MONGODB_URL) return console.log("Mongo url is not found")
if(isConnected) return console.log("alredy connected")

try{
    await mongoose.connect(process.env.MONGODB_URL)
    isConnected=true
    console.log("connected to db")
}catch(error){
    console.log(error)
}
}