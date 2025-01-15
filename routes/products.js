import express from "express";
import { dbAll,dbGet,dbRun } from "../data/database.js";

const router = express.Router();

//api/products - az összes terméket visszaadja egy listában
router.get("/",async(req,res) => {
  try{
    console.log("Getall");
    const rows = await dbAll("SELECT * FROM products");
    console.log('Rows:' + rows)
    res.status(200).json(rows);
  }catch(err){
    console.log(`Error: ${err.message}`);
    res.status(500).json({message: err.message});
  }
});


//api/products - egy új terméket lehet rögzíteni
router.post("/", async(req,res) => {
  const{name, brand, description, price} = req.body
    if(!name && !brand && !description && !price){
      return res.status(400).json({message: "MIssing data"});
    }
    try{
      const product = await dbRun("INSERT INTO products(name, brand, description,price) VALUES (?,?,?,?)", [name, brand, description, price]);
      res.status(201).json({message: "Succesfull Created"});
    }catch(err){
      res.status(500).json({message})
    }
  }
);


//api/products/:id - egy termék adatait lehet lekérdezni
router.get("/:id", async(req,res) => {
  try{
    const product = await dbGet("SELECT * FROM product WHERE id = ?",[req.param.id]);
    if(!product){
      return res.status(404).json({message: "Product not found"});
    }
    res.status(200).json(product);
  }catch(err){
    res.status(500).json({message: err.message});
  }
});


//api/products/:id - egy terméket adataiit lehet módosítani
router.put("/:id",async(req,res) => {
  const{name, brand, description, price} = req.body
    if(!name && !brand && !description && !price){
      return res.status(400).json({message: "MIssing data"});
    }
    try{
      const product =  await dbGet("SELECT * FROM products WHERE id = ? ", [req.param.id]);
      return res.status(404).json({message: "Product not found"});
      await dbRun("UPDATE products SET name = ?, brand = ?, description = ?, price = ? WHERE id = ?",[name,brand,description,price,product.id]);
      res.status(200).json({message: "Succesfull Updated"});
    }catch(err){
      res.status(500).json({message: err.message});
    }
});


//api/products/:id - egy terméket lehet törölni az azonosítója alapján
router.delete("/:id",async(req,res) => {
  try{
    const product = await dbGet("SELECT * FROM products WHERE id = ?",[req.params.id]);
    if(!product){
      return res.status(404).json({message: "Not found"});
    }
    await dbRun("DELETE FROM product WHERE id = ?", [req.param.id]);

  }catch(err){
    res.status(500).json({message: err.message});
  }
});

export default router;