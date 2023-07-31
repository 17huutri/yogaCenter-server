import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js'
import Auth, { localVariables } from '../middleware/auth.js';



/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser,controller.login); // login in app
router.route('/recoveryUser').get(controller.verifyUser,controller.recoveryUser); // login in app

router.route('/getAll').get(controller.getAllUser_2);
// router.route('/getAllUser_2').get(controller.getAllUser_2); // cai nay moi' ne`

router.route('/studentInGrade/:gradeId').get(controller.studentInGrade); // cai nay moi' ne`
router.route('/disableUser/:id').post(controller.disableUser); // cai nay moi' ne`
router.route('/ableUser/:id').post(controller.ableUser); // cai nay moi' ne`


/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/updateUser/:id').post(controller.updateUser_1) // admin & staff
router.route('/deleteUser/:id').delete(controller.deleteUser) // admin & staff
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


router.route('/kickStudent/:id').post(controller.kickoutStudent) // admin & staff


/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password
router.route('/confirmAccount').put(controller.confirmAccount); // use to reset password



export default router;