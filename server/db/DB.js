const mongoose=require("mongoose")

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Db connected");
        
        
    } catch (error) {
        console.log("Failed to connect to DB");
        
    }
}

module.exports=connectDB