import { Schema, Types, model } from 'mongoose';
import { TCategory } from './category.interface';

// Define the schema
const categorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    blogs: {
      type: [Types.ObjectId],
      ref: 'Blog',
      default: [],
    },
    blogCount: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// query middleware show only where isDelete false
categorySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// query middlware for findone
categorySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// aggregate middleware
categorySchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

export const Category = model<TCategory>('Category', categorySchema);
