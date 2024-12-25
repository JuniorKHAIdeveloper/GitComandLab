import { jest } from '@jest/globals';
import { BaseModel } from '../../server/src/models/baseModel';
import { Model } from 'mongoose';

describe('BaseModel - Tests with Mocked Classes', () => {
  const mockCreate = jest.fn();
  const mockFindById = jest.fn();
  const mockFind = jest.fn();
  const mockFindByIdAndUpdate = jest.fn();
  const mockFindByIdAndDelete = jest.fn();
  const mockDistinct = jest.fn();

  const mockModel = {
    create: mockCreate,
    findById: mockFindById,
    find: mockFind,
    findByIdAndUpdate: mockFindByIdAndUpdate,
    findByIdAndDelete: mockFindByIdAndDelete,
    distinct: mockDistinct,
  };

  const baseModel = new BaseModel(mockModel as unknown as Model<any>);

  it('should create a document', async () => {
    mockCreate.mockResolvedValue({ _id: '123', name: 'Test Document' });
    const result = await baseModel.create({});
    expect(result).toBeDefined();
  });

  it('should find a document by ID', async () => {
    mockFindById.mockResolvedValue({ _id: '123', name: 'Found Document' });
    const result = await baseModel.findById('123');
    expect(result).toBeDefined();
  });

  it('should return all documents', async () => {
    mockFind.mockResolvedValue([
      { _id: '1', name: 'Doc 1' },
      { _id: '2', name: 'Doc 2' },
    ]);
    const result = await baseModel.find({});
    expect(result).toBeDefined();
  });

  it('should update a document by ID', async () => {
    mockFindByIdAndUpdate.mockResolvedValue({ _id: '123', name: 'Updated Name' });
    const result = await baseModel.updateById('123', {});
    expect(result).toBeDefined();
  });

  it('should delete a document by ID', async () => {
    mockFindByIdAndDelete.mockResolvedValue({ _id: '123', name: 'Deleted Document' });
    const result = await baseModel.deleteById('123');
    expect(result).toBeDefined();
  });

  it('should return distinct values', async () => {
    mockDistinct.mockResolvedValue(['Value 1', 'Value 2']);
    const result = await baseModel.getDistinct('name');
    expect(result).toBeDefined();
  });
});
