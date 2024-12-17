import { Router } from 'express';
import {
  employeeDELETEbyId,
  employeeGET,
  employeeGETbyId,
  employeePOST,
  employeePUTbyId,
} from '../controllers/employeeControllers';

const router = Router();

router.get('/:id', employeeGETbyId);
router.put('/:id', employeePUTbyId);
router.delete('/:id', employeeDELETEbyId);

router.get('/', employeeGET);
router.post('/', employeePOST);

export default router;
