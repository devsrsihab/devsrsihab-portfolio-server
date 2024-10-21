import { Types } from 'mongoose';

export type TBlog = {
  title: string;
  image: string;
  description: string;
  content: string;
  categories: Types.ObjectId[];
  publishedDate: Date;
  tags: string[];
  isFeatured: boolean;
  isDeleted: boolean;
};
