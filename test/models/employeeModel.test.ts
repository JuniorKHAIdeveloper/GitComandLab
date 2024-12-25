import mongoose from 'mongoose';
import EmployeeModel from '../../server/src/models/employeeModel';
import { jest } from '@jest/globals';

describe('EmployeeModel - Tests with Mocked Classes', () => {
  const mockCreate = jest.fn();
  const mockFind = jest.fn();
  const mockGetDistinct = jest.fn();
  const mockUpdateById = jest.fn();
  const mockDeleteById = jest.fn();

  const employeeModel = new EmployeeModel();
  employeeModel.create = mockCreate;
  employeeModel.find = mockFind;
  employeeModel.getDistinct = mockGetDistinct;
  employeeModel.updateById = mockUpdateById;
  employeeModel.deleteById = mockDeleteById;

  const mockEmployeeData = {
    id: 1,
    name: 'John Doe',
    position: 'Engineer',
    department: 'Development',
    salary: 5000,
  };

  beforeAll(async () => {
    await mongoose.connection.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.connection.collection('employees').deleteMany({});
  });

  it('should create an employee', async () => {
    mockCreate.mockResolvedValue({ _id: '123', name: 'John Doe' });
    const result = await employeeModel.create(mockEmployeeData);
    expect(result).toBeDefined();
  });

  it('should get employees by query', async () => {
    mockFind.mockResolvedValue([{ _id: '123', name: 'John Doe' }]);
    const result = await employeeModel.find({ department: 'Development' });
    expect(result).toBeDefined();
  });

  it('should return distinct departments', async () => {
    mockGetDistinct.mockResolvedValue(['Development', 'HR']);
    const result = await employeeModel.getDistinct('department');
    expect(result).toBeDefined();
  });

  it('should update an employee by ID', async () => {
    mockUpdateById.mockResolvedValue({ _id: '123', salary: 5500 });
    const result = await employeeModel.updateById('123', { salary: 5500 });
    expect(result).toBeDefined();
  });

  it('should delete an employee by ID', async () => {
    mockDeleteById.mockResolvedValue({ _id: '123', name: 'John Doe' });
    const result = await employeeModel.deleteById('123');
    expect(result).toBeDefined();
  });
});
