import mongoose from "mongoose"

const connectDB = async () =>{
    const url = process.env.MONGODB_URI
    try {
        await mongoose.connect(url)
        console.log("DB Connected")
        
    } catch (error) {
        console.log(`"Db error ${error}"`)
    }
}

export default connectDB