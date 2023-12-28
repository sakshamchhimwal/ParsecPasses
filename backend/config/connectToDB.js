import { connect } from "mongoose";


export const connectToMongoDB = async (connectionURI) => {
    try {
        const conn = await connect(connectionURI, { dbName: "ParsecPasses" });
        console.log("Successfully connected to MongoDB");
    } catch (err) {
        throw err;
    }
}