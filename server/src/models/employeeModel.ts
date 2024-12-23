import mongoose, { Schema } from 'mongoose';
import { BaseModel, IBaseModel } from './baseModel';

export interface IEmployee extends IBaseModel {
  id: number;
  name: string;
  position: string;
  department: string;
  salary: number;
}

const employeeSchema: Schema<IEmployee> = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    salary: { type: Number, required: true },
  },
  { timestamps: true }
);

const EmployeeModel = mongoose.model<IEmployee>('Employee', employeeSchema);
export default class EmployeeService extends BaseModel<IEmployee> {
  constructor() {
    super(EmployeeModel);
  }
}
