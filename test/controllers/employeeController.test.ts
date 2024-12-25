import EmployeeController from '../../server/src/controllers/employeeControllers';
import { Request, Response } from 'express';
import { jest } from '@jest/globals';

describe('EmployeeController - Tests with Mocked Classes', () => {
  const mockGetAll = jest.fn();
  const mockGetDepartments = jest.fn();

  // Створюємо мок для контролера
  EmployeeController.getAll = mockGetAll;
  EmployeeController.getDepartments = mockGetDepartments;

  const mockRequest = () => {
    const req = {} as Request;
    req.query = {};
    req.params = {};
    req.body = {};
    return req;
  };

  const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should return all employees', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await EmployeeController.getAll(req, res, jest.fn());
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

  it('should return distinct departments', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await EmployeeController.getDepartments(req, res, jest.fn());
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });
});
