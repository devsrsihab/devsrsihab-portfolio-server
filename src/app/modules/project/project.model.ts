import { model, Schema } from 'mongoose';
import { TExperience } from './project.interface';

// recipe schema
const experienceSchema = new Schema<TExperience>(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'description is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'company is required'],
      trim: true,
    },
    companyImage: {
      type: String,
      default: 'https://placehold.co/385x345/png',
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, 'start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'end date is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// query middleware show only where isDelete false
experienceSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// query middlware for findone
experienceSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// aggregate middleware
experienceSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

// recipe model
export const Experience = model<TExperience>('Experience', experienceSchema);
