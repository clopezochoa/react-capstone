import { MongoClient, ServerApiVersion } from "mongodb";
import { apiHeader } from "./types";

export async function connectMongo() {
  const client = new MongoClient(apiHeader.db_uri!, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  await client.connect();
  return client;
}
