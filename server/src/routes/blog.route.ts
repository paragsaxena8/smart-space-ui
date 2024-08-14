import { Router } from "express";
import { protect, restrictTo } from "../controllers/auth.controller";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getBlog,
  updateBlog,
} from "../controllers/blog.controller";
// import { storage } from "../utils/storage"; TODO: commenting as not in use
export const blogRoute = Router();

blogRoute.route("/").get(getAllBlog).post(createBlog);
blogRoute
  .route("/:slug")
  .get(getBlog)
  .patch(protect, restrictTo("user"), updateBlog)
  .delete(protect, restrictTo("user"), deleteBlog);
