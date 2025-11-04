import dotenv from "dotenv"
dotenv.config()

export const mongooseUri = process.env.MONGO_URI
export const port = process.env.PORT 