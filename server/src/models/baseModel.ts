import { Document, Model } from 'mongoose';

export interface IBaseModel {
  createdAt?: Date;
  updatedAt?: Date;
}

export class BaseModel<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async find(query: any): Promise<T[]> {
    return this.model.find(query).exec();
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  public async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return document.save();
  }

  public async updateById(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  public async deleteById(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  public async getDistinct(field: string): Promise<string[]> {
    const result = await this.model.distinct(field).exec();
    return result as string[];
  }
}
