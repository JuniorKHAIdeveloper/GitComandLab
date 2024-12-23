import { NextFunction, Request, Response } from 'express';
import { Document } from 'mongoose';
import { BaseModel } from '../models/baseModel';

class BaseController<T extends Document> {
  protected modelService: BaseModel<T>;

  constructor(modelService: BaseModel<T>) {
    this.modelService = modelService;

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const items = await this.modelService.find(query);
      if (items.length === 0) {
        next(new Error('No items found'));
      } else {
        res.json(items);
      }
    } catch (err: any) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await this.modelService.findById(req.params.id);
      if (!item) {
        next(new Error('Item not found'));
      } else {
        res.json(item);
      }
    } catch (err: any) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const newItem = await this.modelService.create(req.body);
      res.status(201).json(newItem);
    } catch (err: any) {
      next(err);
    }
  }

  async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedItem = await this.modelService.updateById(req.params.id, req.body);
      if (!updatedItem) {
        next(new Error('Item not found'));
      } else {
        res.json(updatedItem);
      }
    } catch (err: any) {
      next(err);
    }
  }

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedItem = await this.modelService.deleteById(req.params.id);
      if (!deletedItem) {
        next(new Error('Item not found'));
      } else {
        res.json({ message: 'Item deleted' });
      }
    } catch (err: any) {
      next(err);
    }
  }
}

export default BaseController;
