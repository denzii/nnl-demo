import { MongoClient } from 'mongodb'

if (!process.env.CONN_STR) {
  throw new Error('Invalid environment variable: "CONN_STR"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (!process.env.CONN_STR) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   @ts-ignore
  if (!global._mongoClientPromise) {
    client = new MongoClient(String(process.env.CONN_STR), options)
    // @ts-ignore
    global._mongoClientPromise = client.connect()
  }
//   @ts-ignore
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(String(process.env.CONN_STR), options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise