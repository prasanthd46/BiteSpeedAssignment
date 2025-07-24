import express,{Response,Request} from "express"
import dotenv from "dotenv"
import {connectDB,client} from "./utils/db"
import contactRouter from "./routes/routes"

dotenv.config()
const app = express()

const req ={
	"email": "mcfly@hillvalley.edu",
	"phoneNumber": "123456"
}

app.use(express.json());
app.use('/', contactRouter);

connectDB()

export default app