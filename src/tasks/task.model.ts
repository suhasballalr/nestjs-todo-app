import * as mongoose from 'mongoose';

export const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export interface Tasks extends mongoose.Document {
  id: string;
  title: string;
  description: string;
}
