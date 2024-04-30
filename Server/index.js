const express = require('express')
const cors = require('cors')
const path = require('path')
const multer = require('multer')
const mysql = require('mysql')
const app =express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:'reactimageupload'
})

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/Images")
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({
    storage:storage
})

app.post('/upload',upload.single('file'),(req,res)=>{
    const vale =[ 
        req.file.filename,
        req.body.name,
        req.body.email,
        req.body.mobile,
        req.body.password,
        req.body.cpassword,
        req.body.age,
        req.body.date,
        req.body.department,
        req.body.docters,
        req.body.gender,
        req.body.adress,
        req.body.intrestes,
        req.body.langtitude,
        req.body.longtitude,
    ]

    const sql = "INSERT INTO user ( `image`,`name` ,`email`,`mobile`,`pasword`,`cpassword`,`age`,`date`,`department`,`docters`,`gender`,`adress`,`intrestes`,`langtitude`,`longtitude` ) VALUES(?)" 
    db.query(sql , [vale],(err,result)=>{
        if(err) {
            console.log(err);
            return res.json({message:"Error"})
        }   
        console.log("result isr",result);
        return res.json({ Status: "Sucesess" })
    })
})

app.get('/' , (req,res)=>{
    const sql = "SELECT * FROM `user`";
    db.query(sql , (err,result)=>{

        if(err) {
            console.log(err);  
            return res.json({message:"Error"})
        }   
        console.log("result isr",result);
        return res.json(result)
    }) 
})


app.listen(4001,()=>{
    console.log("server is running");
})