const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r5czbuf.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res) => {
  res.send('running the operation')
})

async function run() {
  try {
    await client.connect();

    const db = client.db('FoodLoversDB')
    const productsCollection = db.collection('products')
    const favoriteCollection = db.collection('favorite')

    app.get('/products', async (req, res) => {
      const result = await productsCollection.find().toArray();

      res.send(result)
    })

    // favorite get
    app.get('/favorites', async (req, res) => {
      const result = await favoriteCollection.find().toArray();

      res.send(result)
    })


    app.get('/products-details/:id', async (req, res) => {
      const { id } = req.params

      const result = await productsCollection.findOne({ _id: new ObjectId(id) });

      res.send(result)
    })



    app.post('/products', async (req, res) => {
      const data = req.body;

      const result = await productsCollection.insertOne(data);

      res.send(result)
    })
    
    // favorite post 
    app.post('/favorites', async (req, res) => {
      const data = req.body;

      const result = await favoriteCollection.insertOne(data);

      res.send(result)
    })

    app.put('/products/:id', async (req, res) => {
      const { id } = req.params;
      const update = {
        $set: req.body
      }

      const result = await productsCollection.updateOne({ _id: new ObjectId(id) }, update)

      res.send(result)
    })

    app.delete('/products/:id', async (req, res) => {
      const { id } = req.params;

      const result = await productsCollection.deleteOne({ _id: new ObjectId(id) })

      res.send(result)
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`App running in port : ${port}`);
})