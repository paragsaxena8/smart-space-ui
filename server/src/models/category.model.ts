import { Schema, model, plugin } from "mongoose";
const slug = require("mongoose-slug-updater");

plugin(slug);
const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters"],
  },
  slug: {
    type: String,
    unique: true,
    slug: "name",
  },
  description: String,
}, { strictQuery: true});
categorySchema.index({ name: 1 });

const TagSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters"],
  },
  slug: {
    type: String,
    unique: true,
    slug: "name",
  },
});
TagSchema.index({ name: 1 });

export const Category = model("Category", categorySchema);
export const Tag = model("Tag", TagSchema);
