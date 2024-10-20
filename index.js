const express = require( "express" );
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const userCollection = client.db("userDB").collection("user");

    app.get( '/users', async ( req, res ) =>
    {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result)

    } );
    
    app.post( '/users', async ( req, res ) =>
    {
      const user = req.body;
      console.log( user, "as new user" );
      const result = await userCollection.insertOne( user );
      res.send( result );
    } );

    app.delete( "/users/:id", async ( req, res ) =>
    {
      const id = req.params.id;
      try
      {
        const query = { _id: new ObjectId( id ) };
        const result = await userCollection.deleteOne( query );
        if ( result.deletedCount === 1 )
        {
          res.status( 200 ).send( { deletedCount: 1 } );
        } else
        {
          res.status( 404 ).send( { deletedCount: 0, message: 'User not found' } );
        }

        // res.send( result );
      }
      catch ( error )
      {
        res.status( 500 ).send( { error: 'Failed to delete user' } );
      }
    } );


    // update data
    app.put( '/users/:id', async ( req, res ) =>
    {
      const id = req.params.id;
      const updatedUser = req.body;
  
      try
      {
        const query = { _id: new ObjectId( id ) };
        const updateDoc = {
          $set: {
            name: updatedUser.name,
            email: updatedUser.email,
          },
        };
    
        const result = await userCollection.updateOne( query, updateDoc );
        if ( result.matchedCount === 1 )
        {
          res.status( 200 ).send( { modifiedCount: result.modifiedCount } );
        } else
        {
          res.status( 404 ).send( { message: 'User not found' } );
        }
      } catch ( error )
      {
        res.status( 500 ).send( { error: 'Failed to update user' } );
      }
    } );


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
};
run().catch( console.dir, console.log );


app.get( '/', ( req, res ) =>
{
    res.send( "server is running, ok!" )
} );

app.listen( port, ( req, res ) =>
{
    console.log( "server is listening on port", port );
} );