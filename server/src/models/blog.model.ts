import { Schema, model, Types, plugin } from "mongoose";
import { IUserBlog } from "../interfaces/user.interface";
const slug = require("mongoose-slug-updater");

plugin(slug);
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      unique: true,
    },
    body: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Content must be at least 10 characters"],
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    featuredImage: { data: Buffer, contentType: String },
    slug: {
      type: String,
      unique: true,
      slug: "title",
    },
    summary: {
      type: String,
    },
    readingTime: {
      type: Number,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    strictQuery: true,
  }
);

blogSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: "author",
      select:
        "-passwordChangedAt -passwordResetToken -passwordResetExpires -password -active -role -activationToken -createdAt -bio -email -__v",
      model: "User",
    },
    {
      path: "category",
      select: "name",
      model: "Category",
    },
    {
      path: "tags",
      select: "name",
      model: "Tag",
    },
  ]);

  next();
});

blogSchema.pre<IUserBlog>("save", function (next) {
  this.summary = this.body.substring(0, 150);
  this.readingTime = Math.ceil(this.body.split(" ").length / 200);
  next();
});

export const Blog = model<IUserBlog>("Blog", blogSchema);
