import { Router } from "express";
import * as customerController from '../controllers/customer.js'
const router = Router();

router.route('/getGrade/:idStudent').get(customerController.gradeOfStudent);


export default router;