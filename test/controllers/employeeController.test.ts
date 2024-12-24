import EmployeeController from '../../server/src/controllers/employeeControllers';
import { Request, Response } from 'express';

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

describe('EmployeeController', () => {
  it('should return all employees', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await EmployeeController.getAll(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });

  it('should return distinct departments', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await EmployeeController.getDepartments(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });
});
