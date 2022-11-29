const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Simple Node server is running');
});

app.use(cors());
app.use(express.json());

const users = [
    { id:1, name:"Sabana", email:"sabana@gmail.com" },
    { id:2, name:"Sabnoor", email:"sabnoor@gmail.com" },
    { id:3, name:"Sabila", email:"sabila@gmail.com" }
];

/* 
    username:dbuser1
    password:cdu8rX2FeibWKn4d
*/



const uri = "mongodb+srv://dbuser1:cdu8rX2FeibWKn4d@cluster0.ybh5qdc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const userCollection = client.db("simpleNode").collection('users');
        
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        app.get('/users', async (req, res) =>{
            const cursor = userCollection.find({});
            const users = await cursor.toArray()
            res.send(users);
        })

        app.post('/users', async (req, res) =>{
            const user = req.body;

            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;
            res.send(user);
        })
    }
    finally{
        
    }
}
run().catch(err => console.log(err))


/* app.get('/users', (req, res) => {
    res.send(users);
}) */

/* app.post('/users', (req, res) =>{
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    console.log(user);
    res.send(user);
}) */

app.listen(port, () =>{
    console.log(`Simplle node server is running on: ${port}`);
})