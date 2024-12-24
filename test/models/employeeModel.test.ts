import EmployeeModel, { IEmployee } from '../../server/src/models/employeeModel';
import mongoose from 'mongoose';

describe('EmployeeModel', () => {
  const employeeModel = new EmployeeModel();

  beforeAll(async () => {
    await mongoose.connection.dropDatabase();
  });

  it('should create an employee', async () => {
    const employee = await employeeModel.create({
      id: 1,
      name: 'John Doe',
      position: 'Librarian',
      department: 'Literature',
      salary: 4000,
    });
    expect(employee).toHaveProperty('_id');
    expect(employee.name).toBe('John Doe');
  });

  it('should get employees by query', async () => {
    const employees = await employeeModel.find({});
    expect(employees.length).toBeGreaterThan(0);
  });

  it('should get distinct departments', async () => {
    const departments = await employeeModel.getDistinct('department');
    expect(departments).toContain('Literature');
  });

  it('should update an employee', async () => {
    const employee = await employeeModel.create({
      id: 2,
      name: 'Jane Doe',
      position: 'Assistant',
      department: 'History',
      salary: 3500,
    });
    const updatedEmployee = await employeeModel.updateById(employee._id.toString(), {
      salary: 3700,
    });
    expect(updatedEmployee).not.toBeNull();
    expect(updatedEmployee!.salary).toBe(3700);
  });

  it('should delete an employee', async () => {
    const employee = await employeeModel.create({
      id: 3,
      name: 'Mark Smith',
      position: 'Clerk',
      department: 'Science',
      salary: 3000,
    });
    const deletedEmployee = await employeeModel.deleteById(employee._id.toString());
    expect(deletedEmployee).not.toBeNull();
  });
});
