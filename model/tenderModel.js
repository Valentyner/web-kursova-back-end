import mongoose from "mongoose";

const TenderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique:false,
    },
    text: {
      type: String,
      required: true,
      unique: false,
    },
    price: {
      type: Number,
      default: 0,
    },
    code: {
      type: String,
    },
    unifiedStateRegister: {
      type: String,
      required: true,
    },
    legalEntity: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Tender', TenderSchema);
