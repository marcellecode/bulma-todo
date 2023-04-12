import mongoose, { Model } from "mongoose";

const { DB_URL } = process.env;

export const connect = async () => {
  const conn = await mongoose
    .connect(DB_URL as string)
    .catch((err) => console.log(err));

  const TodoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean,
    priority: Number,
  });
  const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

  return { conn, Todo };
};
