const express = require("express");
const app = express();
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 3000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const client = new MongoClient(process.env.DB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    },
});

// async function connectToDB(onSuccess, onError) {
//     try {
//         await client.connect();
//         console.error("Connection scuess");
//     } catch (error) {
//         console.error("Connection failed!", error);
//     } finally {
//         await client.close();
//     }
// }

app.get("/", async (req, res) => {
    res.send("Test")
});

app.post("/api/get-team", async (req, res) => {
    try {
        await client.connect();
        const data = await client.db(process.env.DB_NAME).collection("team").find({}).toArray();
        res.json(data)
    } catch (error) {
        console.error("Connection failed!", error);
        res.status(500)
    } finally {
        await client.close();
    }
});

app.post("/api/get-past-events", async (req, res) => {
    try {
        await client.connect();
        let data = {}
        data.testimonials = await client.db(process.env.DB_NAME).collection("testimonials").find({}).toArray();
        data.past_events = await client.db(process.env.DB_NAME).collection("past-events").find({}).toArray();
        res.json(data)
    } catch (error) {
        console.error("Connection failed!", error);
        res.status(500)
    } finally {
        await client.close();
    }
    let data = {}
});

app.post("/api/get-home", async (req, res) => {
    try {
        await client.connect();
        let data = {}
        data.faqs = await client.db(process.env.DB_NAME).collection("faqs").find({}).toArray();
        data.iotw = await client.db(process.env.DB_NAME).collection("iotw").find({}).toArray();
        res.json(data)
    } catch (error) {
        console.error("Connection failed!", error);
        res.status(500)
    } finally {
        await client.close();
    }
});

app.listen(port, () => console.log(`Server ready on port ${port}`));

module.exports = app;