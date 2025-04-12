import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: String,
  imgLink: String,
  sessions: [],
});

export default mongoose.models.SmateriseData ||
  mongoose.model("SmateriseData", dataSchema);
