/* eslint-disable @typescript-eslint/no-explicit-any */
import { Blog } from './blog.model';
import { TBlog } from './blog.interface';
import { Category } from '../category/category.model';
import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { arraysEqual } from '../../utils/areArrayEqual';

// create blog
const createBlogToDB = async (payload: TBlog) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // if category not exist in category model throw error
    const categoryIds = payload.categories;
    const category = await Category.find({ _id: { $in: categoryIds } });
    if (category.length !== categoryIds.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Category not found');
    }

    const [newBlog] = await Blog.create([payload], { session });

    // if create
    if (newBlog.categories && newBlog.categories.length > 0) {
      await Category.updateMany(
        {
          _id: { $in: newBlog.categories },
        },
        { $addToSet: { blogs: newBlog._id }, $inc: { blogCount: 1 } },
        { session },
      );
    }

    await session.commitTransaction();
    return newBlog;
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  } finally {
    session.endSession();
  }
};

// get all blogs
const getAllBlogFromDB = async () => {
  const result = await Blog.find().populate('category', 'name');
  return result;
};

// get single blog
const getSingleBlogFromDB = async (id: string) => {
  // if the blog id not exist throw error
  const isBlogIdExist = await Blog.findById(id);
  if (!isBlogIdExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  const result = await Blog.findById(id).populate('category', 'name');
  return result;
};

// update blog
const updateBlogToDB = async (id: string, payload: Partial<TBlog>) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // if the blog id not exist throw error
    const isBlogIdExist = await Blog.findById(id);
    if (!isBlogIdExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
    }

    // if category not exist in category model throw error
    const categoryIds = payload.categories;
    const category = await Category.find({ _id: { $in: categoryIds } });
    if (category.length !== categoryIds?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Category not found');
    }

    // get old blog
    const oldBlog = await Blog.findById(id).session(session);

    // update blog
    const result = await Blog.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
      session,
    });

    // if the oldblog
    if (oldBlog && result && !arraysEqual(oldBlog.categories, result.categories)) {
      const removedCategories = oldBlog.categories.filter(
        (category) => !result.categories.includes(category),
      );
      const addedCategories = result?.categories?.filter(
        (category) => !oldBlog.categories.includes(category),
      );

      // update category with blog id
      await Category.bulkWrite([
        {
          updateMany: {
            filter: { _id: { $in: removedCategories } },
            update: { $pull: { blogs: result._id }, $inc: { blogCount: -1 } },
          },
        },
        {
          updateMany: {
            filter: { _id: { $in: addedCategories } },
            update: { $addToSet: { blogs: result._id }, $inc: { blogCount: 1 } },
          },
        },
      ]);
    }

    await session.commitTransaction();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_GATEWAY, error.message);
  } finally {
    session.endSession();
  }
};

// delete blog
const deleteBlogFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if the blog exists
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
    }

    // Soft delete the blog
    const result = await Blog.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });

    if (!result) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete blog');
    }

    // Update categories
    if (result.categories && result.categories.length > 0) {
      await Category.updateMany(
        { _id: { $in: result.categories } },
        { $pull: { blogs: result._id }, $inc: { blogCount: -1 } },
        { session },
      );
    }

    await session.commitTransaction();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  } finally {
    session.endSession();
  }
};

export const BlogServices = {
  deleteBlogFromDB,
  createBlogToDB,
  getAllBlogFromDB,
  getSingleBlogFromDB,
  updateBlogToDB,
};
