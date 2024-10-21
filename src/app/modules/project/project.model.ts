import { model, Schema } from 'mongoose';
import { TProject } from './project.interface';

// recipe schema
const projectSchema = new Schema<TProject>(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'image is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'content is required'],
    },
    technologies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Technology',
        required: [true, 'technologies are required'],
      },
    ],
    frontendGithubLink: {
      type: String,
      required: [true, 'frontend GitHub link is required'],
    },
    backendGithubLink: {
      type: String,
      required: [true, 'backend GitHub link is required'],
    },
    frontendLiveLink: {
      type: String,
      required: [true, 'frontend live link is required'],
    },
    backendLiveLink: {
      type: String,
      required: [true, 'backend live link is required'],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// query middleware show only where isDelete false
projectSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// query middlware for findone
projectSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// aggregate middleware
projectSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

// recipe model
export const Project = model<TProject>('Project', projectSchema);
