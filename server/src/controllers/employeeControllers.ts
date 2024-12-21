import { NextFunction, Request, Response } from 'express';
import Employee from '../models/employee';

class EmployeeController {
  async getEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const query = { ...req.query };
      const sortBy = query.sortBy as string;
      const sortOrder = parseInt(query.sortOrder as string, 10);

      delete query.sortBy;
      delete query.sortOrder;

      let employees;
      if (sortBy && sortOrder) {
        employees = await Employee.findEmployees(query);
        employees.sort((a, b) => (a as any)[sortBy] - (b as any)[sortBy] * sortOrder);
      } else {
        employees = await Employee.findEmployees(query);
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

  async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const savedEmployee = await Employee.createEmployee(req.body);
      res.status(201).json(savedEmployee);
    } catch (err: any) {
      next(err);
    }
  }

  async getEmployeeById(req: Request, res: Response, next: NextFunction) {
    try {
      const employee = await Employee.findEmployeeById(req.params.id);
      if (!employee) {
        next(new Error('Employee not found'));
      } else {
        res.json(employee);
      }
    } catch (err: any) {
      next(err);
    }
  }

  async updateEmployeeById(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedEmployee = await Employee.updateEmployeeById(req.params.id, req.body);
      if (!updatedEmployee) {
        next(new Error('Employee not found'));
      } else {
        res.json(updatedEmployee);
      }
    } catch (err: any) {
      next(err);
    }
  }

  async deleteEmployeeById(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedEmployee = await Employee.deleteEmployeeById(req.params.id);
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
      const departments = await Employee.getDistinct('department');
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
      const positions = await Employee.getDistinct('position');
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
