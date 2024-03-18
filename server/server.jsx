const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mysql = require("mysql2");
const path = require('path');
const multer = require('multer');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Iancurtis444$$$",
    database: "tiberic"
  });

db.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!");
});

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function( req, file, cb){
    return cb(null, "../TPV/public/images")
  },
  filename: function( req, file, cb ){
    return cb(null, `${file.originalname}`)
  }
})

const upload = multer({storage})

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
})

app.get('/', (re, res) => {
    return res.json("This is server side");
})

app.get("/api/products/getproducts", (req, res) => {
    const sqlGet = "SELECT * FROM productos";
    db.query(sqlGet, (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
  })
})

app.get("/api/families/getfamilies", (req, res) => {
  const sqlGet = "SELECT * FROM familias";
  db.query(sqlGet, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
})
})

app.get("/api/bills/:table", (req, res) => {
  const table = req.params.table;
  const sqlGet = `SELECT * FROM ${table}`
  db.query(sqlGet, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
})
})

app.get("/api/bardata/b1", (req, res) => {
  const sqlGet = `SELECT id, producto, cantidad, precio, familia FROM b1`
  db.query(sqlGet, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
})
})

app.get("/api/bardata/b2", (req, res) => {
  const sqlGet = `SELECT id, producto, cantidad, precio, familia FROM b2`
  db.query(sqlGet, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
})
})

app.get("/api/bardata/b3", (req, res) => {
  const sqlGet = `SELECT id, producto, cantidad, precio, familia FROM b3`
  db.query(sqlGet, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
})
})

app.get("/api/bardata/b4", (req, res) => {
  const sqlGet = `SELECT id, producto, cantidad, precio, familia FROM b4`
  db.query(sqlGet, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
})
})

app.get("/api/bardata/b5", (req, res) => {
  const sqlGet = `SELECT id, producto, cantidad, precio, familia FROM b5`
  db.query(sqlGet, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
})
})

app.get("/api/bardata/b6", (req, res) => {
  const sqlGet = `SELECT id, producto, cantidad, precio, familia FROM b6`
  db.query(sqlGet, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
})
})

app.get("/api/bardata/b7", (req, res) => {
  const sqlGet = `SELECT id, producto, cantidad, precio, familia FROM b7`
  db.query(sqlGet, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
})
})

app.get("/api/bardata/b8", (req, res) => {
  const sqlGet = `SELECT id, producto, cantidad, precio, familia FROM b8`
  db.query(sqlGet, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
})
})

app.put("/api/products/editproducts/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  const producto = req.body.nombre
  const precio = req.body.precio
  const familia = req.body.familia
  const sqlInsert = "UPDATE productos SET `producto` = ?, `precio` = ?, `familia` = ? WHERE id = ?";
  db.query(sqlInsert, [producto, precio, familia, id], (err, result) => {
      console.log(result);
      console.log(err);
      
  })
})

app.post("/api/products/addproducts", (req, res) => {
  const producto = req.body.name
  const precio = req.body.price
  const familia = req.body.family
  const imagen = req.body.image
  const sqlInsert = "INSERT INTO productos (producto, precio, familia, imagen) VALUES (?,?,?,?)";
  db.query(sqlInsert, [producto, precio, familia, imagen], (err, result) => {
      console.log(result);
      console.log(err);
      
  })
})

app.post("/api/families/addfamilies", (req, res) => {
  const nombre = req.body.name
  const imagen = req.body.image
  const sqlInsert = "INSERT INTO familias (nombre, imagen) VALUES (?,?)";
  db.query(sqlInsert, [nombre, imagen], (err, result) => {
      console.log(result);
      console.log(err);
      
  })
})


app.delete("/api/products/deleteproducts/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  const sqlRemove = `DELETE FROM productos WHERE id = ?`;
  db.query(sqlRemove, id, (err, result) => {
      console.log(result);
      console.log(err);
  })
})

app.listen(8000, () => {
    console.log("Listening on port 8000");
})