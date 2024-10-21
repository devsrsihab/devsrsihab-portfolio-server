/* eslint-disable @typescript-eslint/no-explicit-any */
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { BlogServices } from './comment.service';

// create recipe controller
const makeComment = catchAsync(async (req, res) => {
  const { email } = req.user;
  const payload = req.body;

  const result = await BlogServices.makeCommentToDB(email, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment created successfully',
    data: result,
  });
});

// get all comments
const getAllComments = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await BlogServices.getAllCommentsFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comments fetched successfully',
    meta: result.meta,
    data: result.result,
  });
});

// update comment status
const updateCommentStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await BlogServices.updateCommentStatus(id, status);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment status updated successfully',
    data: result,
  });
});

// get all comments based on recipe id
// const getCommentBasedOnRecipe = catchAsync(async (req, res) => {
//   const { recipeId } = req.params;
//   const query = req.query;

//   const { meta, result } = await BlogServices.getCommentBasedOnRecipeFromDB(recipeId, query);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Comments fetched successfully',
//     meta,
//     data: result,
//   });
// });

// delete comment
const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.deleteCommentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment deleted successfully',
    data: result,
  });
});

export const CommentController = {
  makeComment,
  // getCommentBasedOnRecipe,
  getAllComments,
  updateCommentStatus,
  deleteComment,
};
