import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { Technology } from '../technology/technology.model';
import { TSkill } from './skill.interface';
import { Skill } from './skill.model';

// create skill
const createSkillToDB = async (payload: TSkill) => {
  // check technology is exist
  const isTechnologyExist = await Technology.findById(payload.technology);
  if (!isTechnologyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Technology not found');
  }

  const result = await Skill.create(payload);
  return result;
};

// get all skills
const getAllSkillFromDB = async () => {
  const result = await Skill.find().populate('technology');
  return result;
};

// get single skill
const getSingleSkillFromDB = async (id: string) => {
  const result = await Skill.findById(id).populate('technology');
  return result;
};

// update skill
const updateSkillToDB = async (id: string, payload: Partial<TSkill>) => {
  const result = await Skill.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete skill
const deleteSkillFromDB = async (id: string) => {
  const result = await Skill.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return result;
};

export const SkillServices = {
  deleteSkillFromDB,
  createSkillToDB,
  getAllSkillFromDB,
  getSingleSkillFromDB,
  updateSkillToDB,
};
