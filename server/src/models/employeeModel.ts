import mongoose, { Document, Model, Schema } from 'mongoose';
import { BaseModel, IBaseModel } from './baseModel';

export interface IEmployee extends IBaseModel, Document {
  id: number;
  name: string;
  position: string;
  department: string;
  salary: number;
}

class EmployeeModel extends BaseModel<IEmployee> {
  private static employeeModel: Model<IEmployee> = (() => {
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

    return mongoose.model<IEmployee>('Employee', employeeSchema);
  })();

  constructor() {
    super(EmployeeModel.employeeModel);
  }
}

export default EmployeeModel;
