import { Types } from 'mongoose';

export type TSkill = {
  experince?: string;
  technology: Types.ObjectId;
  isDeleted: boolean;
};
