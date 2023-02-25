import cron from "node-cron";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import getWebsites from "./getWebsites.js";
import websiteRoute from "./routes/websites.js";
import cors from "cors";

import axios from "./axios.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
// app.use(cookieParser());

cron.schedule("* * * * *", () => {
  getWebsites().then(async (websites) => {
    // res.json(websites);
    websites.map((website, index) => {
      setTimeout(async () => {
        const { data } = await axios.post("/websites", website);
        console.log(data, new Date().getSeconds());
      }, 1000 * index);
    });
  });
});

// const test = async () => {
//   await axios.post("/websites", { website: "udpatedsdfs " });
// };

// app.get("/test", (req, res) => {
//   getWebsites().then(async (websites) => {
//     res.json(websites);
//     websites.map((website, index) => {
//       setTimeout(async () => {
//         const { data } = await axios.post("/websites", website);
//         console.log(data, new Date().getSeconds());
//       }, 1000 * index);
//     });
//   });
// });

// test();

app.use("/websites", websiteRoute);

app.get("/", (req, res) => {
  res.send("access denied");
});

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
