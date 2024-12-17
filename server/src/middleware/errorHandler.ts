import { NextFunction, Request, Response } from 'express';
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${err.message}`);

  switch (err.message) {
    case 'No employees found':
    case 'Employee not found':
    case 'Position not found':
    case 'Department not found':
      res.status(404).json({ message: err.message });
      break;
    default:
      res.status(500).json({
        message: err.message || 'Something went wrong',
      });
      break;
  }
};

export default errorHandler;
