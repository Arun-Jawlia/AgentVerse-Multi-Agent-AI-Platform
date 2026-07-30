import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const url = process.env.MONGODB_URI
        await mongoose.connect(url)
        console.log("DB Connected")
        console.log("Ready state:", mongoose.connection.readyState);
        
    } catch (error) {
        console.error("MongoDB connection error:");
        console.error(error);
        throw error
    }
}

export default connectDB