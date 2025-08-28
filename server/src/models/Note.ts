import { Schema, model, Document, Types } from 'mongoose';

export interface INote extends Document {
  userId: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User ', required: true },
    content: { type: String, required: true },
  },
  { timestamps: true } 
);

export const Note = model<INote>('Note', noteSchema);
