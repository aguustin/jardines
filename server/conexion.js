import mongoose from "mongoose"
import { mongooseUri } from "./config.js"


export const dbConnection = async () => {
    try{
        await mongoose.connect(mongooseUri)
        console.log('conectado a la base de datos')
    }catch(err){
        console.log(err)
    }
}