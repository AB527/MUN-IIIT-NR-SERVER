class DB {
    database;
    constructor(DBURI) {
        const client = new MongoClient(DBURI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            },
        });
        connectToDB(client);
    };
    async connectToDB(client) {
        console.log("ello")
        try {
            await client.connect();
            this.database = client.db('mun-iiitnr');
            console.log("Connected successfully to MongoDB!");
        } catch (error) {
            console.error("Connection failed!", error);
        } finally {

            await client.close();
        }
    }
}

export default DB()



