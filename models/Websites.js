import mongoose from "mongoose";

const Schema = mongoose.Schema(
  {
    website: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Websites = mongoose.model("websites", Schema);
export default Websites;
