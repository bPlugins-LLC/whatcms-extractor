import mongoose from "mongoose";

const Schema = mongoose.Schema(
  {
    websites: {
      type: [String],
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Websites = mongoose.model("websites", Schema);
export default Websites;
