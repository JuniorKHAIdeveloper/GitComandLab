import { Request, Response } from 'express';
const Employee = require('../models/employee');

export const employeeGET = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const employeePOST = async (req: Request, res: Response) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
