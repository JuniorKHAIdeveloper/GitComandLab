import mongoose, { Document, Schema } from 'mongoose';

interface IEmployee extends Document {
  id: number;
  name: string;
  position: string;
  department: string;
  salary: number;
}

const employeeSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
});

module.exports = mongoose.model<IEmployee>('Employee', employeeSchema);
