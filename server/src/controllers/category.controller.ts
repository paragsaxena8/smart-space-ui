import { Category, Tag } from "../models/category.model";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handle.factory";

// Get all categories
export const getAllCategory = getAll(Category);

// Get single category
export const getCategory = getOne(Category);

// create category
export const createCategory = createOne(Category, ["name", "description"]);

// update category
export const updateCategory = updateOne(Category);

// delete category
export const deleteCategory = deleteOne(Category);

// Get all tags
export const getAllTag = getAll(Tag);

// Get single tag
export const getTag = getOne(Tag);

// create tag
export const createTag = createOne(Tag, ["name"]);

// update tag
export const updateTag = updateOne(Tag);

// delete tag
export const deleteTag = deleteOne(Tag);
