
// get mongoose
import mongoose from "mongoose";

// connect database

const connectDB = async()=>{
    try {
      await mongoose.connect(process.env.DataBase_URL)  
console.log("successfully connected")

    } catch (error) {
        console.log(`Error:${error}`)
        process.exit()
    }
}

export default connectDB;