import { Types } from 'mongoose';

export type TProject = {
  title: string;
  image: string;
  description: string;
  content: string;
  technologies: Types.ObjectId[];
  frontendGithubLink: string;
  backendGithubLink: string;
  frontendLiveLink: string;
  backendLiveLink: string;
  isFeatured: boolean;
  isDeleted: boolean;
};
