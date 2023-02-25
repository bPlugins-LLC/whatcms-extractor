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

const Magento = mongoose.model("magento", Schema);
export default Magento;
