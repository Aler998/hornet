import mongoose, { Document, Schema } from "mongoose";

interface ITodo extends Document {
  title: string;
  link: string;
  time: string;
  nav: string;
  order: number;
  completed: boolean;
  user: Schema.Types.ObjectId
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    time: { type: String, required: true },
    nav: { type: String, required: true },
    order: { type: Number, required: true },
    completed: { type: Boolean, required: true, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;
export type { ITodo };
