const { MongoClient } = require("mongodb");
require("dotenv").config();

// Initialize our MongoDB client
const mongoClient = new MongoClient(process.env.MONGO_URI);

/**
 * This general purpose function is used to query the MongoDB database.
 * @param db: Which database to query
 * @param collection: Which collection to query
 * @param method: The method specified in the request
 * @param data: The data to send to the database (is only used for POST and PUT)
 * @param client: The client used to connect to the database (mongoClient by default)
 * @return {Object}: The result of the query
 */
const query = async (
  db,
  collection,
  method,
  data = undefined,
  client = mongoClient
) => {
  // Form our query and return the promise to the caller

  return new Promise(async (resolve, reject) => {
    client
      .connect()
      .then(async () => {
        // If this is a GET request, we just need to query the database
        if (method === "GET") {
          // Send the results to an array
          const result = await client
            .db(db)
            .collection(collection)
            .find()
            .toArray();
          resolve(result);
        } else if (data) {
          // Add a project
          if (method === "POST") {
            const result = await client
              .db(db)
              .collection(collection)
              .insertOne(data);
            resolve(result);
          }
          // Update a project
          else if (method === "PUT") {
            const result = await client
              .db(db)
              .collection(collection)
              .updateOne({ _id: data._id }, { $set: data });
            resolve(result);
          }
          // Update a delete
          else if (method === "DELETE") {
            const result = await client
              .db(db)
              .collection(collection)
              .deleteOne({ _id: data._id });
            resolve(result);
          }

          // If we don't know what to do, reject the promise
          else {
            reject("[ERROR] Could not route DB request");
          }
        }
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      })
      .finally(() => {
        // client.close();
      });
  });
};

module.exports = query;
