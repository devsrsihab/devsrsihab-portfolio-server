import mongoose from 'mongoose';

export function arraysEqual(arr1: mongoose.Types.ObjectId[], arr2: mongoose.Types.ObjectId[]) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}
