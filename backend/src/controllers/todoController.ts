import { Request, Response } from "express";
import Todo, { ITodo } from "../models/Todo";

export const getAllTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {
      user: {$eq:userId}
    };

    if (req.query.completed !== undefined) {
      query.completed = req.query.completed === 'true';
    }
    
    const todos: ITodo[] = await Todo.find(query).sort({ order: 1 });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore del server" });
  }
};

export const getTodoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { _id } = req.params;
    const todo: ITodo | null = await Todo.findOne({
      id: _id,
      user: userId,
    });

    if (!todo) {
      res.status(404).json({ error: "todo not found" });
    }

    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore del server" });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user!.id;

  try {
    const maxOrderTodo = await Todo.findOne().sort({ order: -1 });

    const todo: ITodo = new Todo({
      ...req.body,
      user: userId,
      order: maxOrderTodo ? maxOrderTodo.order + 1 : 0,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err: unknown) {
    if (err instanceof Error && err.name == "ValidationError") {
      res.status(400).json({ message: err.message });
    }

    res.status(500).json({ message: "Errore del server" });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;

    const { _id } = req.params;
    const { title, link, order, completed } = req.body;

    const updatedTodo: ITodo | null = await Todo.findOneAndUpdate(
      { _id: { $eq: _id }, user: { $eq: userId } },
      { $set: { title, link: link, order: order, completed: completed } },
      { new: true }
    );

    if (!updatedTodo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      if (err.name === "ValidationError") {
        res.status(400).json({ message: err.message });
      }
    }
    res.status(500).json({ message: "Errore del server" });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { _id } = req.params;
    const deletedTodo: ITodo | null = await Todo.findOneAndDelete({
      _id: { $eq: _id },
      user: { $eq: userId },
    });

    if (!deletedTodo) {
      res.status(404).json({ error: "Todo not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore del server" });
  }
};
