import mongoose from "mongoose"
import studentModel from './src/model/students.js'
import courseModel from "./src/model/courses.js"


const enviroment = async () => {
    await mongoose.connect('mongodb+srv://omanias:1234562023@cluster0.3lmci0d.mongodb.net/coderDB?retryWrites=true&w=majority')
    /*   await studentModel.create({
          first_name: "Melany",
          last_name: "Cerilo",
          email: "melany@coder.com",
          gender: "Female"
      }) */

    /*   await courseModel.create({
          title: "Backend",
          description: "Programación Backend",
          topics: ["Js", "Express", "NodeJs", "MongoDB"],
          professor: "El tio Omar"
      }) */


    //cambiar el find por findOne
    let student = await studentModel.findOne({
        _id: "65d367969179d97ab0106839"
    })


    student.courses.push({ course: "65d36946ad4a3cbc42541d4e" })

    let result = await studentModel.updateOne({ _id: "65d367969179d97ab0106839" }, student)

    console.log(result)
}

enviroment()