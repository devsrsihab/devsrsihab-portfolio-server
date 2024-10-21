import { model, Schema, Types } from 'mongoose';
import { TBlog } from './blog.interface';

// recipe schema
const blogSchema = new Schema<TBlog>(
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
    categories: {
      type: [Types.ObjectId],
      ref: 'Category',
      required: [true, 'category is required'],
    },
    tags: {
      type: [String],
      default: [],
    },
    publishedDate: {
      type: Date,
      default: Date.now,
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
blogSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// query middlware for findone
blogSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// aggregate middleware
blogSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

// recipe model
export const Blog = model<TBlog>('Blog', blogSchema);
