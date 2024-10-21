/* eslint-disable @typescript-eslint/no-explicit-any */
import { SkillServices } from './skill.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// create skill controller
const createSkill = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await SkillServices.createSkillToDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill created successfully',
    data: result,
  });
});

// get all skills controller
const getAllSkills = catchAsync(async (req, res) => {
  const result = await SkillServices.getAllSkillFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skills retrieved successfully',
    data: result,
  });
});

// get single skill controller
const getSingleSkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SkillServices.getSingleSkillFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single skill retrieved successfully',
    data: result || 'No data found',
  });
});

// update skill controller
const updateSkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SkillServices.updateSkillToDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill updated successfully',
    data: result || 'No data found',
  });
});

// delete skill controller
const deleteSkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SkillServices.deleteSkillFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill deleted successfully',
    data: result,
  });
});

export const SkillController = {
  getAllSkills,
  createSkill,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
