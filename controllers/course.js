//CRUD 
import CourseModel from "../model/Course.model.js";

export async function createCourse(req, res) {
    const {
        courseName,
        price,
        startTime,
        description,
        endTime,
    } = req.body
    debugger
    try {
        const existingCourse = await CourseModel.find({courseName : courseName})
        if (existingCourse.length != 0) return res.status(409).json({error : "Course already exist" })
        const newCourse = await CourseModel.create({
            courseName,
            price,
            description,
            startTime,
            
            endTime,
        })
        debugger
        res.status(201).json({
            msg: 'Create new Course success',
            data: newCourse
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Failed haha'
        })
    }
}
export async function getAllCourses(req, res) {
    try {
        const allCourses = await CourseModel.find()
        res.status(200).json(
            allCourses
        )
    } catch (error) {
        res.status(500).json({
            msg: 'Failed'
        })
    }
}
export async function deleteCourse(req, res) {
    const id = req.params.id
    try {
        const deleteCourse = await CourseModel.deleteOne({ _id: id })
        res.status(202).json({
            msg: 'Delete Success'
        })
    } catch (error) {
        res.status(204).json({
            msg: 'Cannot delete'
        })
    }
}
export async function updateCourse(req, res) {
    const id = req.params.id
    const {
        courseName,
        price,
        description,
        startTime,
        endTime,
    } = req.body
    try {
        const updateCourse = await CourseModel.findById({ _id: id })
        updateCourse.courseName = courseName || updateCourse.courseName;
        updateCourse.price = price || updateCourse.price;
        updateCourse.description = description || updateCourse.description;
        updateCourse.startTime = startTime || updateCourse.startTime;
        updateCourse.endTime = endTime || updateCourse.endTime;
        await updateCourse.save()
        res.status(200).json({
            msg: 'Update Success'
        })
    } catch (error) {
        res.status(204).json({
            msg: 'Cannot update'
        })
    }
}
export async function detailCourse(req,res){
    const courseName = req.params.courseName
    try {
        const course = await CourseModel.find({courseName : courseName})
        res.status(200).json(course)
    } catch (error) {
        res.status(500).json({
            error : "Server error"
        })
    }
}