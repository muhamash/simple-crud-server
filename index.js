const express = require( "express" );
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require( "cors" );
const app = express();
const port = process.env.PORT || 3000;

app.use( cors() );
app.use( express.json() );

// G7U2TPCyWPniFTGT || ashrafula412


const uri = "mongodb+srv://ashrafula412:G7U2TPCyWPniFTGT@firstproject.9d6qe.mongodb.net/?retryWrites=true&w=majority&appName=firstProject";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient( uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
} );

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Connect to the "insertDB" database and access its "haiku" collection
    const database = client.db("userDB");
    const userCollection = database.collection("user");

    app.post( '/users', async ( req, res ) =>
    {
      const user = req.body;
      console.log( user, "as new user" );
      // Insert the defined document into the "haiku" collection
      const result = await userCollection.insertOne( user );
      res.send( result );
    } );


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir, console.log);



app.get( '/', ( req, res ) =>
{
    res.send( "server is running, ok!" )
} );

app.listen( port, ( req, res ) =>
{
    console.log( "server is listening on port", port );
} );