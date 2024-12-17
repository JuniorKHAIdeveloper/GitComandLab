import { Router } from 'express';
import { employeeGET, employeePOST } from '../controllers/employeeControllers';

const router = Router();

router.get('/', employeeGET);
router.post('/', employeePOST);

export default router;
