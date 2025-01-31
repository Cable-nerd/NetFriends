import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import PostRoute from "./routes/PostRoute.js";
import cors from "cors";
import UploadRoute from "./routes/UploadRoute.js";
import ChatRoute from "./routes/ChatRoute.js" 
import MessageRoute from "./routes/MessageRoute.js"


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Serve images for public
app.use(express.static('public')); 
app.use('/images', express.static('images'));


dotenv.config();
const PORT = process.env.PORT;

const CONNECTION =process.env.MONGO_DB;
mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


// Usage of routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/posts', PostRoute);
app.use('/upload', UploadRoute);
app.use("/chat", ChatRoute);
app.use('/message', MessageRoute)

