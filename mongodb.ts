import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts"

const MONGO_URL = Deno.env.get('MONGODB_URI') || 'mongodb://localhost:27017'

const client = new MongoClient()
client.connectWithUri(MONGO_URL)

const databaseName = Deno.env.get('DB_NAME') || 'tjsp'

const db = client.database(databaseName)

console.log(MONGO_URL )
console.log('O Banco de Dados está conectado em : ' + databaseName )

export default db