import { NextFunction, Request, Response } from 'express';
import EmployeeModel, { IEmployee } from '../models/employeeModel';
import BaseController from './BaseController';

class EmployeeController extends BaseController<IEmployee> {
  constructor() {
    super(new EmployeeModel());

    this.getAll = this.getAll.bind(this);
    this.getDepartments = this.getDepartments.bind(this);
    this.getPositions = this.getPositions.bind(this);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query = { ...req.query };
      const sortBy = query.sortBy as string;
      const sortOrder = parseInt(query.sortOrder as string, 10);

      delete query.sortBy;
      delete query.sortOrder;

      let employees;
      if (sortBy && sortOrder) {
        employees = await this.modelService.find(query);
        employees.sort((a, b) => (a as any)[sortBy] - (b as any)[sortBy] * sortOrder);
      } else {
        employees = await this.modelService.find(query);
      }

      if (employees.length === 0) {
        next(new Error('No employees found'));
      } else {
        res.json(employees);
      }
    } catch (err: any) {
      next(err);
    }
  }

  async getDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const departments = await this.modelService.getDistinct('department');
      if (!departments.length) {
        next(new Error('Departments not found'));
      } else {
        res.json(departments);
      }
    } catch (err: any) {
      next(err);
    }
  }

  async getPositions(req: Request, res: Response, next: NextFunction) {
    try {
      const positions = await this.modelService.getDistinct('position');
      if (!positions.length) {
        next(new Error('Positions not found'));
      } else {
        res.json(positions);
      }
    } catch (err: any) {
      next(err);
    }
  }
}

export default new EmployeeController();
