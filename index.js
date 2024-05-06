

//Coffe
//KTiAPzyWxgY1e8k0

const express = require('express');
const cors=require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT ||5000;


//Middelware
app.use(cors());
app.use(express.json() );




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9ahuupe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);
// const uri = "mongodb+srv://<username>:<password>@cluster0.9ahuupe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("insertDB");
    const CoffeCollection = database.collection("Coffe");

    app.post('/coffe',async(req,res)=>{
      const coffe=req.body;
      console.log(coffe);
      const result=await CoffeCollection.insertOne(coffe);
      res.send(result);
    })

 app.get('/coffe',async(req,res)=>{
  const cursor= CoffeCollection.find();
  const result= await cursor.toArray();
  res.send(result );
 })

 app.get('/coffe/:id',async(req,res)=>{
  const id=req.params.id;
  const query={_id:new ObjectId(id)};
  const result=await CoffeCollection.findOne(query);
  res.send(result);
 })

 app.put('/coffe/:id',async(req,res)=>{
  const id=req.params.id;
  const query={_id:new ObjectId(id)};
  const options = { upsert: true };
  const updatedcoffe=req.body;
  const coffe={
    $set:{
      name:updatedcoffe.name,
      chef:updatedcoffe.chef,
       supplier:updatedcoffe.supplier,
        test:updatedcoffe.test,
         catagorey:updatedcoffe.catagorey, details:updatedcoffe.details,
          photo:updatedcoffe.photo
    }
  }
  const result=await CoffeCollection.updateOne(query,coffe,options);
  res.send(result);

 })

 app.delete('/coffe/:id',async(req,res)=>{
  const id=req.params.id;
  const query={_id:new ObjectId(id)};
  const result=await CoffeCollection.deleteOne(query);
  res.send(result);
 })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);






app.get('/',(req,res)=>{
    res.send(" simple crud is running");
})


app.listen(port ,()=>{
    console.log(`simple crud running on ,${port}`);
} )
