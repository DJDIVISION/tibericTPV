const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mysql = require("mysql2");
const path = require('path');
const multer = require('multer');


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (re, res) => {
    return res.json("This is server side");
})

app.post('/print', (req, res) => {
  const { printerName, data } = req.body;
  
  // Aquí implementa la lógica para imprimir en la impresora especificada
  console.log(`Imprimiendo en la impresora ${printerName}: ${data}`);
  
  res.send('Impresión iniciada');
});


app.listen(8000, () => {
    console.log("Listening on port 8000");
})