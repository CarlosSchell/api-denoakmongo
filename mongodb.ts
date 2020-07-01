// 
import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts"

const MONGO_URL = `mongodb+srv://CarlosSchell:Chsmon1962@cluster0-osikw.gcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true` 
const client = new MongoClient()
client.connectWithUri(MONGO_URL)

const db = client.database('tjsp')

export default db