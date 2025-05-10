import mongoose, { Document, Schema } from 'mongoose';

interface ICategory extends Document {
  title: string;
  slug: string;
}

const categorySchema = new Schema<ICategory>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
}, {
  timestamps: true
});

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
export type { ICategory };

