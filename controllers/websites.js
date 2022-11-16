import Website from "../models/Websites.js";

export const createWebsite = async (req, res) => {
  try {
    const exist = await Website.findOne({ website: req.body.website });
    if (!exist) {
      const newWebsite = new Website(req.body);
      await newWebsite.save();
      res.status(200).send("already exists.");
      return;
    }
    res.status(200).send("Website has been added.");
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
  try {
    const websites = await Website.find();
    res.status(200).json(websites);
  } catch (err) {
    next(err);
  }
};
