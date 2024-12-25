import { Request, Response } from 'express';
import { BaseModel } from '../../server/src/models/baseModel';
import BaseController from '../../server/src/controllers/baseController';
import { jest } from '@jest/globals';

describe('BaseController', () => {
  const mockModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };
  const baseModel = new BaseModel(mockModel as any);
  const baseController = new BaseController(baseModel);

  const mockRequest = (): Partial<Request> => ({
    query: {},
    params: {},
    body: {},
  });

  const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should get all items', async () => {
    mockModel.find.mockResolvedValue([{ _id: '1', name: 'Item 1' }, { _id: '2', name: 'Item 2' }]);
    const req = mockRequest();
    const res = mockResponse();
    await baseController.getAll(req as Request, res as Response, jest.fn());
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ _id: '1', name: 'Item 1' }, { _id: '2', name: 'Item 2' }]);
  });

  it('should create an item', async () => {
    mockModel.create.mockResolvedValue({ _id: '123', name: 'New Item' });
    const req = mockRequest();
    req.body = { name: 'New Item' };
    const res = mockResponse();
    await baseController.create(req as Request, res as Response, jest.fn());
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ _id: '123', name: 'New Item' });
  });

  it('should get an item by ID', async () => {
    mockModel.findById.mockResolvedValue({ _id: '123', name: 'Found Item' });
    const req = mockRequest();
    req.params = { id: '123' };
    const res = mockResponse();
    await baseController.getById(req as Request, res as Response, jest.fn());
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ _id: '123', name: 'Found Item' });
  });

  it('should update an item by ID', async () => {
    mockModel.findByIdAndUpdate.mockResolvedValue({ _id: '123', name: 'Updated Item' });
    const req = mockRequest();
    req.params = { id: '123' };
    req.body = { name: 'Updated Item' };
    const res = mockResponse();
    await baseController.updateById(req as Request, res as Response, jest.fn());
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ _id: '123', name: 'Updated Item' });
  });

  it('should delete an item by ID', async () => {
    mockModel.findByIdAndDelete.mockResolvedValue({ _id: '123', name: 'Deleted Item' });
    const req = mockRequest();
    req.params = { id: '123' };
    const res = mockResponse();
    await baseController.deleteById(req as Request, res as Response, jest.fn());
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ _id: '123', name: 'Deleted Item' });
  });
});
