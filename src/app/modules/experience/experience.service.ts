import { Experience } from './experience.model';
import { TExperience } from './experience.interface';

// create recipe
const createExperienceToDB = async (payload: TExperience) => {
  const result = await Experience.create(payload);
  return result;
};

// get all recipes
const getAllExperienceFromDB = async () => {
  const result = await Experience.find();
  return result;
};

// get single recipe
const getSingleExperienceFromDB = async (id: string) => {
  const result = await Experience.findById(id);
  return result;
};

// update recipe
const updateExperienceToDB = async (id: string, payload: Partial<TExperience>) => {
  const result = await Experience.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete recipe
const deleteExperienceFromDB = async (id: string) => {
  const result = await Experience.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return result;
};

export const ExperienceServices = {
  deleteExperienceFromDB,
  createExperienceToDB,
  getAllExperienceFromDB,
  getSingleExperienceFromDB,
  updateExperienceToDB,
};
