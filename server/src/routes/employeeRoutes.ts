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

    this.router.get('/:id', EmployeeController.getById);
    this.router.put('/:id', EmployeeController.updateById);
    this.router.delete('/:id', EmployeeController.deleteById);

    this.router.get('/', EmployeeController.getAll);
    this.router.post('/', EmployeeController.create);
  }
}

export default new EmployeeRoutes().router;
