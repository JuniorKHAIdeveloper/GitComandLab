import { jest } from '@jest/globals';
import { BaseModel } from '../../server/src/models/baseModel';
import { Model } from 'mongoose';

describe('BaseModel with Mocks', () => {
  const mockModel = {
    create: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    distinct: jest.fn(),
  };

  const baseModel = new BaseModel(mockModel as unknown as Model<any>);

  it('should create a document', async () => {
    mockModel.create.mockResolvedValue({ _id: '123', name: 'Test Document' });
    const doc = await baseModel.create({ name: 'Test Document' });
    expect(doc).toEqual({ _id: '123', name: 'Test Document' });
    expect(mockModel.create).toHaveBeenCalledWith({ name: 'Test Document' });
  });

  it('should find a document by ID', async () => {
    mockModel.findById.mockResolvedValue({ _id: '123', name: 'Found Document' });
    const doc = await baseModel.findById('123');
    expect(doc).toEqual({ _id: '123', name: 'Found Document' });
    expect(mockModel.findById).toHaveBeenCalledWith('123');
  });

  it('should return all documents', async () => {
    mockModel.find.mockResolvedValue([{ _id: '1', name: 'Doc 1' }, { _id: '2', name: 'Doc 2' }]);
    const docs = await baseModel.find({});
    expect(docs).toEqual([{ _id: '1', name: 'Doc 1' }, { _id: '2', name: 'Doc 2' }]);
    expect(mockModel.find).toHaveBeenCalledWith({});
  });

  it('should update a document by ID', async () => {
    mockModel.findByIdAndUpdate.mockResolvedValue({ _id: '123', name: 'Updated Name' });
    const updatedDoc = await baseModel.updateById('123', { name: 'Updated Name' });
    expect(updatedDoc).toEqual({ _id: '123', name: 'Updated Name' });
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('123', { name: 'Updated Name' }, { new: true });
  });

  it('should delete a document by ID', async () => {
    mockModel.findByIdAndDelete.mockResolvedValue({ _id: '123', name: 'Deleted Document' });
    const deletedDoc = await baseModel.deleteById('123');
    expect(deletedDoc).toEqual({ _id: '123', name: 'Deleted Document' });
    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('123');
  });

  it('should return distinct values', async () => {
    mockModel.distinct.mockResolvedValue(['Value 1', 'Value 2']);
    const distinctValues = await baseModel.getDistinct('name');
    expect(distinctValues).toEqual(['Value 1', 'Value 2']);
    expect(mockModel.distinct).toHaveBeenCalledWith('name');
  });
});
