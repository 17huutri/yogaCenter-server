import { Router } from "express";
import * as adminController  from '../controllers/admin.js'
import Auth, { localVariables } from '../middleware/auth.js';
import { updateUser_1,deleteUser } from "../controllers/appController.js";

const router = Router();


router.route('/getCustomers').get(adminController.getCustomers); // register user
router.route('/getMentors').get(adminController.getMentors); // register user
router.route('/getStaffs').get(adminController.getStaffs); // register user
router.route('/getAdmins').get(adminController.getAdmins); // register user
router.route('/updateCustomer/:id').post(updateUser_1)
router.route('/deleteCusomer/:id').post(deleteUser)

export default router;