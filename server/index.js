import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
