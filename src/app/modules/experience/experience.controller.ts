/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExperienceServices } from './experience.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// create experience controller
const createExperience = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await ExperienceServices.createExperienceToDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience created successfully',
    data: result,
  });
});

// get all experiences controller
const getAllExperiences = catchAsync(async (req, res) => {
  const result = await ExperienceServices.getAllExperienceFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experiences retrieved successfully',
    data: result,
  });
});

// get single experience controller
const getSingleExperience = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExperienceServices.getSingleExperienceFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single experience retrieved successfully',
    data: result || 'No data found',
  });
});

// update experience controller
const updateExperience = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExperienceServices.updateExperienceToDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience updated successfully',
    data: result || 'No data found',
  });
});

// delete experience controller
const deleteExperience = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExperienceServices.deleteExperienceFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience deleted successfully',
    data: result,
  });
});

export const ExperienceController = {
  getAllExperiences,
  createExperience,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};
