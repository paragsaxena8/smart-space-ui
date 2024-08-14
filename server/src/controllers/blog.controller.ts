import { NextFunction, Request, Response } from "express";
import { Blog } from "../models/blog.model";
import catchAsync from "../utils/catchAsync";
import {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} from "./handle.factory";

// Get all blogs
export const getAllBlog = getAll(Blog);

// Get single blog
export const getBlog = getOne(Blog);

// Create blog
export const createBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, author, body, category, tags } = req.body;
    const featuredImage = {
      data: req.file.filename,
      conentType: "image/png",
    };

    const data = await Blog.create({
      title,
      author,
      body,
      category,
      featuredImage,
      tags,
    });
    res.status(201).json({
      status: "success",
      data,
    });
  }
);

// Update blog
export const updateBlog = updateOne(Blog);

// Delete blog
export const deleteBlog = deleteOne(Blog);
