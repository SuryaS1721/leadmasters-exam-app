import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true },
  tags: [{ type: String }]
}, { timestamps: true });

export const Question = mongoose.model('Question', questionSchema);
