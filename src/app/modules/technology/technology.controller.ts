/* eslint-disable @typescript-eslint/no-explicit-any */
import { TechnologyServices } from './technology.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// create technology controller
const createTechnology = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await TechnologyServices.createTechnologyToDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technology created successfully',
    data: result,
  });
});

// get all technologies controller
const getAllTechnologies = catchAsync(async (req, res) => {
  const result = await TechnologyServices.getAllTechnologyFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technologies retrieved successfully',
    data: result,
  });
});

// get single technology controller
const getSingleTechnology = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TechnologyServices.getSingleTechnologyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single technology retrieved successfully',
    data: result || 'No data found',
  });
});

// update technology controller
const updateTechnology = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TechnologyServices.updateTechnologyToDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technology updated successfully',
    data: result || 'No data found',
  });
});

// delete technology controller
const deleteTechnology = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TechnologyServices.deleteTechnologyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technology deleted successfully',
    data: result,
  });
});

export const TechnologyController = {
  getAllTechnologies,
  createTechnology,
  getSingleTechnology,
  updateTechnology,
  deleteTechnology,
};
