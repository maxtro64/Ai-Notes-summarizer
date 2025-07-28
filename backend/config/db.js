import mongoose from "mongoose";

const connect=async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/chat-bot")
        console.log("Connected To Database")
    } catch (error) {
        console.log("Connection failed")
    }

}

export default connect;