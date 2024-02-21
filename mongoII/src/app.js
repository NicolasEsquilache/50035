import express, { response } from "express"
import mongoose from "mongoose"
import userRouter from "./routes/users.router.js"
import userModel from "./model/user.model.js"

const app = express()
const PORT = 8080

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


app.use(express.json())



const enviroment = async () => {
    await mongoose.connect('mongodb+srv://omanias:1234562023@cluster0.3lmci0d.mongodb.net/coderDB?retryWrites=true&w=majority')
    let response = await userModel.find({ first_name: "Celia" }).explain('executionStats')
    console.log(response)
}
/* mongoose.connect("mongodb+srv://omanias:1234562023@cluster0.3lmci0d.mongodb.net/coderDB?retryWrites=true&w=majority")
    .then(() => {
        console.log("Conectado a la base de datos")
    })
    .catch(error => {
        console.error("Error al conectarse a la base de datos", error)
    })
 */

enviroment()

app.use("/api/users", userRouter)