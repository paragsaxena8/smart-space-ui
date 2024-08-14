import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import { Model, Schema } from "mongoose";
import { APIFeatures } from "../utils/apiFeatures";
import { RequestObj } from "../interfaces/user.interface";

// Get All Data
export const getAll = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let filter;
    let query = req.query;
    if (query.category) filter = { category: query.category };
    if (query.user) filter = { author: { $eq: { _id: query.user } } };
    const features = new APIFeatures(Model.find(filter), query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const data = await features.query;
    res.status(200).json({
      status: "success",
      total: data.length,
      data,
    });
  });

// Get Single Data
export const getOne = (Model: Model<any>, popOptions?: object) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let data;
    if (req.params.id) {
      data = await Model.findById(req.params.id);
    } else if (req.params.slug) {
      data = await Model.findOne({ slug: req.params.slug }, popOptions);
    }
    if (!data) return next(new AppError("No data found with this input", 404));
    res.status(200).json({
      status: "success",
      data,
    });
  });

// Create Data
export const createOne = (Model: Model<any>, args: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let finalObj: any = {};
    args.forEach((element: string) => {
      if (!req.body[element]) {
        return next(new AppError(`${element} is required`, 400));
      } else {
        finalObj[element] = req.body[element];
      }
    });

    const data = await Model.create(finalObj);
    res.status(201).json({
      status: "success",
      data,
    });
  });

// Update Data
export const updateOne = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let data;
    if (req.params.id) {
      data = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    } else if (req.params.slug) {
      data = await Model.findOneAndUpdate({ slug: req.params.slug }, req.body, {
        new: true,
        runValidators: true,
      });
    }
    if (!data) {
      return next(new AppError("No data found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data,
    });
  });

// Delete Data
export const deleteOne = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let data;
    if (req.params.id) {
      data = await Model.findByIdAndDelete(req.params.id);
    } else if (req.params.slug) {
      data = await Model.findOneAndDelete({ slug: req.params.slug });
    }
    if (!data) {
      return next(new AppError("No data found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data,
    });
  });

export const checkOne = (Model: Model<any>, arg: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let status = true;
    const data = await Model.findOne({ [arg]: req.body[arg] });
    if (data) {
      status = false;
    }
    res.status(200).json({
      status,
    });
  });
