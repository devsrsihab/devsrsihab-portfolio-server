import httpStatus from 'http-status';
import { Category } from './category.model';
import { TCategory } from './category.interface';
import AppError from '../../errors/appError';

const createCategory = async (category: TCategory) => {
  const result = await Category.create(category);
  return result;
};

const getAllCategories = async () => {
  const result = await Category.find().sort({ createdAt: -1 }).populate('blogs', 'title image');
  return result;
};

const getCategoryById = async (categoryId: string): Promise<TCategory | null> => {
  const isCategoryExists = await Category.findOne({
    _id: categoryId,
  });

  if (!isCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, ' Category not found!');
  }

  const category = await Category.findOne({
    _id: categoryId,
  }).populate('blogs', 'title image');
  return category;
};

const updateCategory = async (id: string, updateData: Partial<TCategory>) => {
  const isCategoryExists = await Category.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!isCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found!');
  }

  const category = await Category.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return category;
};

const deleteCategory = async (id: string) => {
  const isCategoryExists = await Category.findOne({
    _id: id,
    isDeleted: false,
  });
  if (!isCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, ' Category not found!');
  }

  const category = await Category.findByIdAndDelete(id);
  return category;
};

export const CategoryServices = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
