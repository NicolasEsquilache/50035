import express from "express";
import UsersRouter from "./routes/users.js";

const app = express();
const port = 8080;

const usersRouter = new UsersRouter();
app.use("/", usersRouter.getRouter());

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});