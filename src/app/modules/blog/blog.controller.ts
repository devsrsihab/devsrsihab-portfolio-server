/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogServices } from './blog.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// create blog controller
const createBlog = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await BlogServices.createBlogToDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

// get all blogs controller
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs retrieved successfully',
    data: result,
  });
});

// get single blog controller
const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.getSingleBlogFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single blog retrieved successfully',
    data: result || 'No data found',
  });
});

// update experience controller
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlogToDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result || 'No data found',
  });
});

// delete experience controller
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.deleteBlogFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const BlogController = {
  getAllBlogs,
  createBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
