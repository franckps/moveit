import { MongoClient, Db } from 'mongodb'

let dbConnection: Db = null

export default async function Connection(dbUrl: string) : Promise<Db>{
    if(dbConnection) {
        return dbConnection
    }

    const client = await MongoClient.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    dbConnection = client.db('moveit')

    return dbConnection
}