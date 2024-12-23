import { NextFunction, Request, Response } from 'express';
import EmployeeService from '../models/employeeModel';

class EmployeeController {
  modelService: EmployeeService;

  constructor() {
    this.modelService = new EmployeeService();
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

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const employee = await this.modelService.findById(req.params.id);
      if (!employee) {
        next(new Error('Employee not found'));
      } else {
        res.json(employee);
      }
    } catch (err: any) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newEmployee = await this.modelService.create(req.body);
      res.status(201).json(newEmployee);
    } catch (err: any) {
      next(err);
    }
  }

  async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedEmployee = await this.modelService.updateById(req.params.id, req.body);
      if (!updatedEmployee) {
        next(new Error('Employee not found'));
      } else {
        res.json(updatedEmployee);
      }
    } catch (err: any) {
      next(err);
    }
  }

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedEmployee = await this.modelService.deleteById(req.params.id);
      if (!deletedEmployee) {
        next(new Error('Employee not found'));
      } else {
        res.json({ message: 'Employee deleted' });
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
