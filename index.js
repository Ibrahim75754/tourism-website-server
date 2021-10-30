const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

//middleWire
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bvhfe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('connected to database');
        const database = client.db('travel');
        const packagesCollection = database.collection('packages');

        /* //GET API All services
        app.get('/services', async (req, res) => {
            const cursor = packagesCollection.find({});
            const services = await cursor.toArray();
            res.json(services);
        });

        //GET single Service API
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };

            const service = await packagesCollection.findOne(query);
            res.json(service);
        }); */

        //POST API
        app.post('/packages', async (req, res) => {
            const service = req.body;
            console.log('hit the post api', service);
            const result = await packagesCollection.insertOne(service);

            res.json(result);
        });

    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('running genius server');
});

app.listen(port, () => {
    console.log('runnin port ', port)
})