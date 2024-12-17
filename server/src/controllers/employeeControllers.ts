import { NextFunction, Request, Response } from 'express';
const Employee = require('../models/employee');

export const employeeGET = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query;

    const sortBy = req.query.sortBy as string;
    const sortOrder = parseInt(req.query.sortOrder as string);

    delete query.sortBy;
    delete query.sortOrder;

    if (sortBy && sortOrder) {
      const employees = await Employee.find(query)?.sort({ [sortBy]: sortOrder });
      if (employees.length === 0) next(new Error('No employees found'));
      else res.json(employees);
    } else {
      const employees = await Employee.find(query);
      if (employees.length === 0) next(new Error('No employees found'));
      else res.json(employees);
    }
  } catch (err: any) {
    next(err);
  }
};

export const employeePOST = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err: any) {
    next(err);
  }
};

export const employeeGETbyId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) next(new Error('Employee not found'));
    else res.json(employee);
  } catch (err: any) {
    next(err);
  }
};

export const employeePUTbyId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedEmployee) next(new Error('Employee not found'));
    else res.json(updatedEmployee);
  } catch (err: any) {
    next(err);
  }
};

export const employeeDELETEbyId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) next(new Error('Employee not found'));
    else res.json({ message: 'Employee deleted' });
  } catch (err: any) {
    next(err);
  }
};

export const departmentGET = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const department = await Employee.distinct('department');
    if (!department) next(new Error('Department not found'));
    else res.json(department);
  } catch (err: any) {
    next(err);
  }
};

export const positionGET = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const position = await Employee.distinct('position');
    if (!position) next(new Error('Position not found'));
    else res.json(position);
  } catch (err: any) {
    next(err);
  }
};
