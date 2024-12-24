import { Request, Response } from 'express';
import { BaseModel } from '../../server/src/models/baseModel';
import BaseController from '../../server/src/controllers/baseController';
import { Document, Schema, model } from 'mongoose';

interface ITestModel extends Document {
  name: string;
}

const testSchema = new Schema({
  name: { type: String, required: true },
});
const TestMongooseModel = model<ITestModel>('TestController', testSchema);
const testModel = new BaseModel<ITestModel>(TestMongooseModel);
const testController = new BaseController(testModel);

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

describe('BaseController', () => {
  beforeAll(async () => {
    await testModel.create({ name: 'Test 1' });
  });

  it('should return all items', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await testController.getAll(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });

  it('should create an item', async () => {
    const req = mockRequest();
    req.body = { name: 'Test Item' };
    const res = mockResponse();
    await testController.create(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
