import mongoose, { Schema, Document } from "mongoose";

export interface IBudget extends Document {
  month: string;
  category: string;
  limit: number;
  createdAt: Date;
  updatedAt: Date;
}

const BudgetSchema: Schema<IBudget> = new Schema(
  {
    month: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Transport",
        "Entertainment",
        "Utilities",
        "Shopping",
        "Health",
        "Other",
      ],
    },
    limit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BudgetModel =
  (mongoose.models.Budget as mongoose.Model<IBudget>) ||
  mongoose.model<IBudget>("Budget", BudgetSchema);

export default BudgetModel;
