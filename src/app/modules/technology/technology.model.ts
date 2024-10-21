import { model, Schema } from 'mongoose';
import { TTechnology } from './technology.interface';

// technology schema
const technologySchema = new Schema<TTechnology>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'image is required'],
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// query middleware show only where isDelete false
technologySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// query middlware for findone
technologySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// aggregate middleware
technologySchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

// recipe model
export const Technology = model<TTechnology>('Technology', technologySchema);
