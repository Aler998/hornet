import { Request, Response } from "express";
import Category, { ICategory } from "../models/Category";

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories: ICategory[] = await Category.find();
    res.json(categories);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(500).json({ message: "Errore del server" });
  }
};

export const getCategoryBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category: ICategory | null = await Category.findOne({
      slug: req.params.slug,
    });

    if (!category) {
      res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(500).json({ message: "Errore del server" });
  }
};

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category: ICategory = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.name === "ValidationError") {
        res.status(400).json({ message: err.message });
      }

      res.status(500).json({ message: "Errore del server" });
    }

    res.status(500).json({ message: "Errore del server" });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const slug = req.params.slug;
    const updatedCategory: ICategory | null = await Category.findOneAndUpdate(
      { slug: { $eq: slug } },
      { title: req.body.title, slug: req.body.newSlug },
      { new: true }
    );

    if (!updatedCategory) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.json(updatedCategory);
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === "ValidationError") {
        res.status(400).json({ message: err.message });
      }

      res.status(500).json({ message: "Errore del server" });
    }
    res.status(500).json({ message: "Errore del server" });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedCategory: ICategory | null = await Category.findOneAndDelete({
      slug: req.params.slug,
    });

    if (!deletedCategory) {
      res.status(404).json({ error: "Category not found" });
    }

    res.status(204).send();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    res.status(500).json({ message: "Errore del server" });
  }
};
