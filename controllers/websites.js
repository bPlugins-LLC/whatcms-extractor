import Website from "../models/Websites.js";
import Woocommerce from "../models/Woocommerce.js";
import PrestaShop from "../models/PrestaShop.js";
import dotenv from "dotenv";
import Magento from "../models/Magento.js";
import Elementor from "../models/Elementor.js";
import Joomla from "../models/Joomla.js";
import WordPress from "../models/WordPress.js";
import Shopify from "../models/Shopify.js";

dotenv.config();

export const createWebsite = async (req, res) => {
  const websites = req.body;
  // return res.json(websites);

  try {
    const done = [];
    await websites.map(({ category, website }) => {
      setTimeout(async () => {
        if (category === "woocommerce") {
          addWebsite(Woocommerce, website);
        } else if (category === "prestashop") {
          addWebsite(PrestaShop, website);
        } else if (category === "magento") {
          addWebsite(Magento, website);
        } else if (category === "elementor") {
          addWebsite(Elementor, website);
        } else if (category === "joomla") {
          addWebsite(Joomla, website);
        } else if (category === "wordpress") {
          addWebsite(WordPress, website);
        } else if (category === "shopify") {
          addWebsite(Shopify, website);
        } else {
          addWebsite(Website, website);
        }
      }, 100);
      done.push({ category, website });
    });
    return res.json(done);
  } catch (error) {
    console.log(error.message);
  }

  // try {
  //   const dateExist = await Website.findOne({ date });

  //   if (dateExist) {
  //     console.log("date exists");
  //     const exist = await Website.findOne({ websites: { $in: [website] } });
  //     if (!exist) {
  //       await Website.findOneAndUpdate(
  //         { date },
  //         {
  //           $push: { websites: website },
  //         }
  //       );
  //     } else {
  //       console.log("data exists", { exist, website });
  //       res.send("already exist");
  //     }
  //   } else {
  //     const newWebsite = new Website({ websites: [website], date });
  //     await newWebsite.save();
  //     res.json("website added");
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
};

export const addWebsite = async (Model, website) => {
  const date = new Date().toLocaleString().match(/(.+), /)?.[1];
  const dateExist = await Model.findOne({ date });
  if (dateExist) {
    const exist = await Model.findOne({ websites: { $in: [website] } });
    if (!exist) {
      await Model.findOneAndUpdate(
        { date },
        {
          $push: { websites: website },
        }
      );
    } else {
      console.log("data exists", { exist, website });
      return "already exist";
    }
  } else {
    const newWebsite = new Model({ websites: [website], date });
    await newWebsite.save();
    return "website added";
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

export const getWebsitesByType = async (req, res, next) => {
  const { token, type } = req.params;

  if (token === process.env.JWT) {
    try {
      if (type === "woocommerce") {
        res.status(200).json(await Woocommerce.find());
      } else if (type === "magento") {
        res.status(200).json(await Magento.find());
      } else if (type === "prestashop") {
        res.status(200).json(await PrestaShop.find());
      } else if (type === "normal") {
        res.status(200).json(await Website.find());
      } else if (type === "joomla") {
        res.status(200).json(await Joomla.find());
      } else if (type === "wordpress") {
        res.status(200).json(await WordPress.find());
      } else if (type === "shopify") {
        res.status(200).json(await Shopify.find());
      } else if (type === "elementor") {
        res.status(200).json(await Elementor.find());
      } else {
        res.status(200).json(await Website.find());
      }
    } catch (err) {
      console.log(err);
    }
    return;
  }
  res.json("access denied");
};
