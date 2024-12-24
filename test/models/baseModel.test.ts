import mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';
import { BaseModel } from '../../server/src/models/baseModel';

interface ITestModel extends Document {
  _id: string;
  name: string;
}

const testSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
});

const TestMongooseModel = mongoose.model<ITestModel>('Test', testSchema);

describe('BaseModel', () => {
  const baseModel = new BaseModel<ITestModel>(TestMongooseModel);

  beforeAll(async () => {
    await TestMongooseModel.deleteMany({});
  });

  it('should create a document', async () => {
    const doc = await baseModel.create({ _id: new mongoose.Types.ObjectId().toString(), name: 'Test Document' });
    expect(doc).toHaveProperty('_id');
    expect(doc.name).toBe('Test Document');
  });

  it('should find a document by ID', async () => {
    const doc = await baseModel.create({ _id: new mongoose.Types.ObjectId().toString(), name: 'Another Test' });
    const foundDoc = await baseModel.findById(doc._id.toString());
    expect(foundDoc).not.toBeNull();
    expect(foundDoc!.name).toBe('Another Test');
  });

  it('should return all documents', async () => {
    const docs = await baseModel.find({});
    expect(docs.length).toBeGreaterThan(0);
  });

  it('should update a document by ID', async () => {
    const doc = await baseModel.create({ _id: new mongoose.Types.ObjectId().toString(), name: 'To Update' });
    const updatedDoc = await baseModel.updateById(doc._id.toString(), { name: 'Updated Name' });
    expect(updatedDoc).not.toBeNull();
    expect(updatedDoc!.name).toBe('Updated Name');
  });

  it('should delete a document by ID', async () => {
    const doc = await baseModel.create({ _id: new mongoose.Types.ObjectId().toString(), name: 'To Delete' });
    const deletedDoc = await baseModel.deleteById(doc._id.toString());
    expect(deletedDoc).not.toBeNull();
    const foundDoc = await baseModel.findById(doc._id.toString());
    expect(foundDoc).toBeNull();
  });

  it('should return distinct values', async () => {
    await baseModel.create({ _id: new mongoose.Types.ObjectId().toString(), name: 'Value 1' });
    await baseModel.create({ _id: new mongoose.Types.ObjectId().toString(), name: 'Value 2' });
    const distinct = await baseModel.getDistinct('name');
    expect(distinct).toContain('Value 1');
    expect(distinct).toContain('Value 2');
  });
});
