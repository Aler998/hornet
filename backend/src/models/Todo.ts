import mongoose, { Document, Schema } from "mongoose";

interface ITodo extends Document {
  title: string;
  link: string;
  order: number;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    link: { type: String, required: true},
    order: { type: Number, required: true },
    completed: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;
export type { ITodo };
