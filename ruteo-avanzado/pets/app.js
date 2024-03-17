const express = require('express');
const petsRouter = require('./routes/pets.router.js');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/pets', petsRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

