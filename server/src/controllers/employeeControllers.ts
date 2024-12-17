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
    res.status(400).json({ error: err.message });
  }
};

export const employeeGETbyId = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) res.status(404).json({ error: 'Employee not found' });
    else res.json(employee);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const employeePUTbyId = async (req: Request, res: Response) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedEmployee) res.status(404).json({ error: 'Employee not found' });
    else res.json(updatedEmployee);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const employeeDELETEbyId = async (req: Request, res: Response) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) res.status(404).json({ error: 'Employee not found' });
    else res.json({ message: 'Employee deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};