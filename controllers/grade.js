//CRUD 
import GradeModel from "../model/Grade.model.js";

export async function createGrade(req, res) {
    const {
        instructor,
        course,
        gradeName,
        description,
        _image,
        room,
        weekDay,
        startTimeGrade,
        endTimeGrade
    } = req.body
    try {
        const existingGrade = await GradeModel.find({ gradeName: gradeName })
        debugger
        if (existingGrade.length != 0) return res.status(409).json({ error: "Grade already exist" })

        const newGrade = await GradeModel.create({
            instructor,
            course,
            nOfStudent: 0,
            description,
            gradeName,
            _image: _image || '',
            room,
            weekDay,
            startTimeGrade,
            endTimeGrade,
        })
        debugger
        res.status(201).json({
            msg: 'Create new Grade success',
            data: newGrade
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Failed'
        })
    }
}
export async function getAllGrades(req, res) {
    try {
        const allGrades = await GradeModel.find().sort({"startTimeGrade" : 1})
        res.status(200).json(
            allGrades
        )
    } catch (error) {
        res.status(500).json({
            msg: 'Failed'
        })
    }
}
export async function deleteGrade(req, res) {
    const id = req.params.id
    try {
        const deleteGrade = await GradeModel.deleteOne({ _id: id })
        res.status(202).json({
            msg: 'Delete Success'
        })
    } catch (error) {
        res.status(204).json({
            msg: 'Cannot delete'
        })
    }
}
export async function updateGrade(id) {
    try {
        const updateGrade = await GradeModel.findById({id });
        debugger
        
        updateGrade.nOfStudent =  updateGrade.nOfStudent + 1;
        await updateGrade.save();
        return 1;
    } catch (error) {
        return 0;
    }
}
export async function searchGrade(req, res) {
    const gradeName = req.query.gradeName;
    try {
        const grade = await GradeModel.find({ gradeName: { $regex: gradeName, $options: 'i' } });
        res.status(200).json(grade);
    } catch (error) {
        res.status(500).json({
            error: 'Server error',
        });
    }
}
export async function gradesOfMentor(req, res) {
    const mentorId = req.params.mentorId;
    try {
        const grades = await GradeModel.find({instructor : mentorId}).sort({"startTimeGrade" : 1});
        res.status(200).json(grades);
    } catch (error) {
        res.status(500).json({
            error: 'Server error',
        });
    }
}
export async function getGradeById(req, res) {
    const id = req.params.id;
    try {
        const grade = await GradeModel.findById( id );
        res.status(200).json(grade);
    } catch (error) {
        res.status(500).json({
            error: 'Server error',
        });
    }
}

// co dinh k update