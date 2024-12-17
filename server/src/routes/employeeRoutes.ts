import { Router } from 'express';
import {
  departmentGET,
  employeeDELETEbyId,
  employeeGET,
  employeeGETbyId,
  employeePOST,
  employeePUTbyId,
  positionGET,
} from '../controllers/employeeControllers';

const router = Router();

router.get('/department', departmentGET);
router.get('/position', positionGET);

router.get('/:id', employeeGETbyId);
router.put('/:id', employeePUTbyId);
router.delete('/:id', employeeDELETEbyId);

router.get('/', employeeGET);
router.post('/', employeePOST);

export default router;
