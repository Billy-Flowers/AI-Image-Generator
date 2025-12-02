import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import express from 'express';
import PostRoutes from "./routes/Posts.js";
import generateImageRoute from "./routes/GenerateImage.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true}));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.use("/api/posts", PostRoutes);
app.use("/api/generateImage/", generateImageRoute);

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from AI Image Generator",
  });
});

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};  

startServer();