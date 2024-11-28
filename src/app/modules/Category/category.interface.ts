import { Document, Model } from 'mongoose';

// Interface for the ItemCategory document
export interface CategoryDocument extends Document {
  name: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Type for the input data when creating/updating a category
export type TCategory = {
  name: string;
  isDeleted?: boolean;
};

// Interface for the ItemCategory model (if no static methods)
export type TCategoryModel = Model<CategoryDocument>;
