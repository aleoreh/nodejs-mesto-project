import mongoose from "mongoose";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

type ICard = {
  name: string;
  link: string;
  owner: string;
  likes: string[];
};

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "user",
  },
  createdAt: Date,
});

export default mongoose.model<ICard>("card", cardSchema);
