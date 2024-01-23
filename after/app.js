import express from "express";

const app = express()
const PORT = 8080

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Endpoints
let tareas = [
    { id: 1, titulo: 'Hacer la compra' },
    { id: 2, titulo: 'Preparar la cena' },
    { id: 3, titulo: 'Estudiar para el examen' },
    { id: 4, titulo: 'Ir al gimnasio' },
    { id: 5, titulo: 'Llamar a mamá' },
    { id: 6, titulo: 'Revisar correos electrónicos' },
    { id: 7, titulo: 'Pasear al perro' },
    { id: 8, titulo: 'Organizar el escritorio' },
    { id: 9, titulo: 'Planificar vacaciones' },
    { id: 10, titulo: 'Actualizar el currículum' }
];

// Método GET para obtener todas las tareas
app.get("/tareas", (req, res) => {
    res.json(tareas)
})

// Método GET para obtener una tarea por ID
app.get("/tareas/:id", (req, res) => {

    const tareaId = parseInt(req.params.id)
    const tarea = tareas.find((t) => t.id === tareaId)
    if (tarea) {
        res.json(tarea)
    } else {
        res.status(404).json({ message: "Tarea no encontrada" })
    }
})

// Método POST para crear una nueva tarea
app.post("/tareas", (req, res) => {
    const { titulo } = req.body
    const nuevaTarea = { id: tareas.length + 1, titulo: titulo || "tarea por defecto" }
    tareas.push(nuevaTarea)
    res.status(201).json(nuevaTarea)
})


//Método PUT para modificar una tarea por ID
app.put("/tareas/:id", (req, res) => {
    const tareaId = parseInt(req.params.id)
    const tarea = tareas.find((t) => t.id === tareaId)

    if (tarea) {
        const { titulo } = req.body
        tarea.titulo = titulo
        res.json(tarea)
    } else {
        res.status(404).json({ message: "Tarea no encontrada" })
    }
})

// Método DELETE para eliminar tarea por ID
app.delete("/tareas/:id", (req, res) => {

    const tareaId = parseInt(req.params.id)

    const tarea = tareas.filter((t) => t.id !== tareaId)
    res.json({ message: `tarea eliminada correctamente` })
    tareas = tarea
}
)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))