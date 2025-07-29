import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/chat-bot", {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      retryReads: true,
      maxPoolSize: 10,
      socketTimeoutMS: 45000
    });
    console.log("Connected To Database");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    // Retry connection after delay
    setTimeout(connect, 5000);
  }
};

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Reconnecting...');
  connect();
});

export default connect;