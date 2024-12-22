import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IEmployee extends Document {
  id: number;
  name: string;
  position: string;
  department: string;
  salary: number;
}

class Employee {
  private static model: Model<IEmployee> = (() => {
    const employeeSchema: Schema<IEmployee> = new Schema({
      id: { type: Number, required: true, unique: true },
      name: { type: String, required: true },
      position: { type: String, required: true },
      department: { type: String, required: true },
      salary: { type: Number, required: true },
    });

    return mongoose.model<IEmployee>('Employee', employeeSchema);
  })();

  public static async findEmployees(query: any): Promise<IEmployee[]> {
    return this.model.find(query).exec();
  }

  public static async findEmployeeById(id: string): Promise<IEmployee | null> {
    return this.model.findById(id).exec();
  }

  public static async createEmployee(data: Partial<IEmployee>): Promise<IEmployee> {
    const employee = new this.model(data);
    return employee.save();
  }

  public static async updateEmployeeById(
    id: string,
    data: Partial<IEmployee>
  ): Promise<IEmployee | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  public static async deleteEmployeeById(id: string): Promise<IEmployee | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  public static async getDistinct(field: string): Promise<string[]> {
    const result = await this.model.distinct(field).exec();
    return result as string[];
  }
}

export default Employee;
