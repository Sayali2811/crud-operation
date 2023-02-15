import express, { response } from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123",
    database:"Product",
})

app.get("/",(req,res)=>{
    res.json("hello this is backend")
})

app.get("/item",(req,res)=>{
    const q="SELECT * FROM Item;"
    db.query(q,(err,data)=>{
        if(err){return res.json(err)};
        return res.json(data)
    });
});
app.post("/item",(req,res)=>{
    console.log(req.body)
    const q="INSERT INTO item (`prod_name`,`price`,`pur_date`) VALUES (?)";
    const values=[
        req.body.prod_name,
    
        req.body.price,
        req.body.pur_date,
    ];

    db.query(q,[values],(err,data)=>{
        if(err)return res.json(err);
        return res.json(data);
    })
})
app.delete("/item/:id", (req, res) => {
    const id = req.params.id;
    const q = " DELETE FROM item WHERE id = ? ";

    db.query(q, [id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  app.put("/item/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE item SET `prod_name`= ?,`price`= ?, `pur_date`= ? WHERE id = ?";
  
    const values = [
        req.body.prod_name,
        req.body.price,
        req.body.pur_date,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
app.listen(8800,()=>{
    console.log("Connect to nodemon !")
})