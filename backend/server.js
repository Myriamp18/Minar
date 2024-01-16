const express = require('express');
const mysql = require('mysql')
const cors = require('cors')


const app = express()
app.use(cors())


const db = mysql.createConnection({
    host:"localhost",
    user: 'root',
    password:'',
    database: 'minar'
})

app.get('/', (re, res)=> {
    return res.json("from backend side")
})
/////////////SILOS//////////
app.get('/silos', (resq, res)=>{
    const sql = "Select * From silos";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/create', (req, res)=>{
    const sql = "INSERT INTO  silos (fecha, silo1, silo2, silo3, silo4, silo5) VALUES (?)";
    const values =  [
        req.body.fecha,
        req.body.silo1,
        req.body.silo2,
        req.body.silo3,
        req.body.silo4,
        req.body.silo5
    ]
    db.query(sql ,[ values],(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.put('/update/id', (req, res)=>{
    const sql = "update silos set fecha = ?, silo1 = ?, silo2 = ?, silo3 = ?, silo4 = ?, silo5 = ? where id = ?";
    const values =  [
        req.body.fecha,
        req.body.silo1,
        req.body.silo2,
        req.body.silo3,
        req.body.silo4,
        req.body.silo5
    ]
    const id = req.params.id;
    db.query(sql ,[...values, id],(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.delete('/delete/id', (req, res)=>{
    const sql = "delete from silos where id = ?";
    const id = req.params.id;
    db.query(sql ,[id],(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})





app.listen(8081, ()=>{
    console.log("listening");
})
