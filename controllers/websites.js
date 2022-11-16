import Website from "../models/Websites.js";
import dotenv from "dotenv";

dotenv.config();

export const createWebsite = async (req, res) => {
  const date = new Date().toLocaleString().match(/(.+), /)?.[1];
  const { website } = req.body;
  try {
    const exist = await Website.findOne({ date });

    if (exist) {
      if (!exist.websites.includes(website)) {
        console.log({ website });
        await Website.findOneAndUpdate(
          { date },
          {
            $push: { websites: website },
          }
        );
      } else {
        res.send("already exist");
      }
    } else {
      const newWebsite = new Website({ websites: [website], date });
      await newWebsite.save();
      res.json("website added");
    }

    //     if (!exist) {
    //       const newWebsite = new Website(req.body);
    //       await newWebsite.save();
    //       res.status(200).send("already exists.");
    //       return;
    //     }
    //     res.status(200).send("Website has been added.");
  } catch (err) {
    console.log(err);
  }
};

export const updateWebsite = async (req, res, next) => {
  try {
    const updatedWebsite = await Website.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedWebsite);
  } catch (err) {
    next(err);
  }
};
export const deleteWebsite = async (req, res, next) => {
  try {
    await Website.findByIdAndDelete(req.params.id);
    res.status(200).json("Website has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getWebsite = async (req, res, next) => {
  try {
    const website = await Website.findById(req.params.id);
    res.status(200).json(website);
  } catch (err) {
    next(err);
  }
};
export const getWebsites = async (req, res, next) => {
  const { token } = req.params;

  if (token === process.env.JWT) {
    try {
      const websites = await Website.find();
      res.status(200).json(websites);
    } catch (err) {
      console.log(err);
    }
    return;
  }
  res.json("access denied");
};
