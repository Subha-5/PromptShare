import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    } else {
        try {
            await mongoose.connect(
                process.env.MONGO_URI,
                {
                    dbName: "share_prompt",
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            )
            isConnected = true;
            console.log('MongoDB Connected');
        } catch (error) {
            console.log(error);
        }
    }
}