import UserModel from "../model/User.model.js";
import GradeModel from "../model/Grade.model.js";

export async function gradeOfStudent(req,res){
    const idStudent = req.params.idStudent;
    try {
        const student = await UserModel.findById(idStudent);
        const grade = await GradeModel.findById(student.grade);
        res.status(200).json(grade);
    } catch (error) {
        res.status(500).json({error : error});
    }
}