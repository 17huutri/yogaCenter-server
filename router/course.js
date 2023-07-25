import { Router } from "express";
import * as courseController from '../controllers/course.js'
const router = Router();

router.route('/createCourse').post(courseController.createCourse);
router.route('/getAllCourses').get(courseController.getAllCourses);
router.route('/deleteCourse/:id').delete(courseController.deleteCourse);
router.route('/updateCourse/:id').post(courseController.updateCourse);
router.route('/detailCourse/:courseName').get(courseController.detailCourse);

export default router;