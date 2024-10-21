import { model, Schema } from 'mongoose';
import { TSkill } from './skill.interface';

// recipe schema
const skillSchema = new Schema<TSkill>(
  {
    technology: {
      type: Schema.Types.ObjectId,
      ref: 'Technology',
    },
    experince: {
      type: String,
      default: '',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// query middleware show only where isDelete false
skillSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// query middlware for findone
skillSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// aggregate middleware
skillSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

// recipe model
export const Skill = model<TSkill>('Skill', skillSchema);
