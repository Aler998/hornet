import express from "express";
import authRoutes from "./auth";
import tripRoutes from "./trips";
import categoriesRoutes from "./categories";
import todosRoutes from "./todos";
import usersRoutes from "./user";

const apiRouter = express.Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/trips", tripRoutes);
apiRouter.use("/categories", categoriesRoutes);
apiRouter.use("/todos", todosRoutes);
apiRouter.use("/user", usersRoutes);

export default apiRouter;
