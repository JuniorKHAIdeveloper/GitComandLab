import mongoose from 'mongoose';
import EmployeeModel from '../../server/src/models/employeeModel';

describe('EmployeeModel', () => {
  const mockEmployeeData = {
    id: 1,
    name: 'John Doe',
    position: 'Engineer',
    department: 'Development',
    salary: 5000,
  };

  const employeeModel = new EmployeeModel();

  beforeAll(async () => {
    await mongoose.connection.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.connection.collection('employees').deleteMany({});
  });

  it('should create an employee', async () => {
    const employee = await employeeModel.create(mockEmployeeData);
    expect(employee).toHaveProperty('_id');
    expect(employee.name).toBe('John Doe');
    expect(employee.department).toBe('Development');
  });

  it('should get employees by query', async () => {
    await employeeModel.create(mockEmployeeData);
    const employees = await employeeModel.find({ department: 'Development' });
    expect(employees.length).toBe(1);
    expect(employees[0].name).toBe('John Doe');
  });

  it('should get distinct departments', async () => {
    await employeeModel.create(mockEmployeeData);
    await employeeModel.create({
      id: 2,
      name: 'Jane Smith',
      position: 'Manager',
      department: 'HR',
      salary: 7000,
    });
    const distinctDepartments = await employeeModel.getDistinct('department');
    expect(distinctDepartments).toContain('Development');
    expect(distinctDepartments).toContain('HR');
  });

  it('should update an employee by ID', async () => {
    const employee = await employeeModel.create(mockEmployeeData);
    const updatedEmployee = await employeeModel.updateById(employee._id.toString(), { salary: 5500 });
    expect(updatedEmployee).not.toBeNull();
    expect(updatedEmployee!.salary).toBe(5500);
  });

  it('should delete an employee by ID', async () => {
    const employee = await employeeModel.create(mockEmployeeData);
    const deletedEmployee = await employeeModel.deleteById(employee._id.toString());
    expect(deletedEmployee).not.toBeNull();
    const foundEmployee = await employeeModel.findById(employee._id.toString());
    expect(foundEmployee).toBeNull();
  });
});
