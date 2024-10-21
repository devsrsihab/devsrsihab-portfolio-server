/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProjectServices } from './project.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// create project controller
const createProject = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await ProjectServices.createProjectToDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project created successfully',
    data: result,
  });
});

// get all projects controller
const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectServices.getAllProjectFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Projects retrieved successfully',
    data: result,
  });
});

// get single project controller
const getSingleProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.getSingleProjectFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single project retrieved successfully',
    data: result || 'No data found',
  });
});

// update experience controller
const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.updateProjectToDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project updated successfully',
    data: result || 'No data found',
  });
});

// delete experience controller
const deleteProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.deleteProjectFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience deleted successfully',
    data: result,
  });
});

export const ProjectController = {
  getAllProjects,
  createProject,
  getSingleProject,
  updateProject,
  deleteProject,
};
