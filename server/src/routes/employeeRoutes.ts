import { Router } from 'express';
import EmployeeController from '../controllers/employeeControllers';

class EmployeeRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/departments', EmployeeController.getDepartments);
    this.router.get('/positions', EmployeeController.getPositions);

    this.router.get('/:id', EmployeeController.getEmployeeById);
    this.router.put('/:id', EmployeeController.updateEmployeeById);
    this.router.delete('/:id', EmployeeController.deleteEmployeeById);

    this.router.get('/', EmployeeController.getEmployees);
    this.router.post('/', EmployeeController.createEmployee);
  }
}

export default new EmployeeRoutes().router;
