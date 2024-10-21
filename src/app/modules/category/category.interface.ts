import { Types } from 'mongoose';

export type TCategory = {
  name: string;
  blogs: Types.ObjectId[];
  blogCount?: number;
  isDeleted: boolean;
};
