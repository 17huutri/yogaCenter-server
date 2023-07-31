import { Router } from "express";
import * as gradeController from '../controllers/grade.js'
const router = Router();

router.route('/createGrade').post(gradeController.createGrade);
router.route('/getAllGrades').get(gradeController.getAllGrades);
router.route('/deleteGrade/:id').delete(gradeController.deleteGrade);
router.route('/detailGrade').get(gradeController.searchGrade);
router.route('/gradesOfMentor/:mentorId').get(gradeController.gradesOfMentor);// cai nay` moi ne
router.route('/getGradeById/:id').get(gradeController.getGradeById);// cai nay` moi ne


export default router;