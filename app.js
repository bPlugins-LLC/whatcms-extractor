import cron from "node-cron";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import getWebsites from "./getWebsites.js";
import websiteRoute from "./routes/websites.js";
// import axios from "axios";
import cors from "cors";

import axios from "./axios.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
// app.use(cookieParser());

cron.schedule("* * * * *", () => {
  getWebsites().then((websites) => {
    websites.map(async (website) => {
      await axios.post("/websites", { website });
    });
  });
});

app.use("/websites", websiteRoute);

const connect = async () => {
  const CONNECTION_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zoihqmz.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(CONNECTION_URL);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};

app.listen(process.env.PORT || 3000, () => {
  connect();
  console.log("server is running");
});
