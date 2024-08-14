import { Router } from "express";
import {
  getCategory,
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
  createTag,
  deleteTag,
  getAllTag,
  getTag,
  updateTag,
} from "../controllers/category.controller";

export const categoryRoute = Router();
export const tagRoute = Router();

categoryRoute.route("/").get(getAllCategory).post(createCategory);
categoryRoute
  .route("/:id")
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

tagRoute.route("/").get(getAllTag).post(createTag);
tagRoute.route("/:id").get(getTag).patch(updateTag).delete(deleteTag);
