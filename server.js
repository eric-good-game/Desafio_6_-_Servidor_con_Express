import express from 'express';
import Container from './classContainer.js';

const app = express();
const port = 8080;

const Products = new Container('products');

app.listen(port,()=>{
  console.log(`Server is running and listening on the port: ${port}`);
})

app.on("error", error => console.log(`Server error: ${error}`))

app.get('/',async (req,res)=>{
  res.send(`<h1>Hello World!</h1>`)

})

app.get('/products',async (req,res)=>{
  const products = await Products.getAll();
  res.json(products);
})

app.get('/randomProduct',async (req,res)=>{
  await Products.getFile();
  const random_id = Math.ceil(Math.random() * Products.file.data.length);

  res.json(Products.getById(random_id));
})
