//CRUD 
import BookingModel from "../model/Booking.model.js";
import UserModel from "../model/User.model.js";
import { updateGrade } from "./grade.js";
import GradeModel from "../model/Grade.model.js";
export async function createBooking(req, res) {
    const {
        user,
        grade,
    } = req.body
    try {
        const check = await UserModel.findById(user)
        debugger
        if (check.grade != null) return res.status(409).json({ error: "You already have grade" })
        const newBooking = await BookingModel.create({
            user,
            grade,
            isAccepted: 0
        })
        debugger
        res.status(201).json({
            msg: 'Create new Booking success',
            data: newBooking
        })
    } catch (error) {
        debugger
        res.status(500).json({
            msg: 'Failed'
        })
    }
}
export async function getAllBookings(req, res) {
    let status = req.query.status;
    console.log(status);
    try {
        const allBookings = await BookingModel.find({ isAccepted: status })
        res.status(200).json(
            allBookings
        )
    } catch (error) {
        res.status(500).json({
            msg: 'Failed'
        })
    }
}
export async function deleteBooking(req, res) {
    const id = req.params.id
    try {
        const booking = await BookingModel.findById(id)
        const deleteBooking = await BookingModel.deleteOne({ _id: id })
        const updateGrade = await GradeModel.findById(booking.grade.toString());
        const updateUser = await UserModel.findById(booking.user.toString())
        updateGrade.nOfStudent = updateGrade.nOfStudent - 1;
        updateUser.grade = null;
        await updateGrade.save();
        await updateUser.save();

        res.status(202).json({
            msg: 'Delete Success'
        })
    } catch (error) {
        res.status(204).json({
            msg: 'Cannot delete'
        })
    }
}
export async function updateBooking(req, res) {
    const id = req.params.id

    try {

        const updateBooking = await BookingModel.findById(id);
        const updateUser = await UserModel.findById(updateBooking.user.toString());
        const updateGrade = await GradeModel.findById(updateBooking.grade.toString());
        const number = await UserModel.find({ grade: updateGrade._id.toString() });

        debugger
        if (updateGrade.nOfStudent <= 20 && updateUser.grade == null) {
            updateGrade.nOfStudent = number.length + 1;
            updateUser.grade = updateBooking.grade;
        }
        else throw Error;
        updateBooking.isAccepted = 1;
        await updateBooking.save();
        await updateUser.save();
        await updateGrade.save();
        res.status(200).json({
            msg: 'Update Success'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Cannot update'
        })
    }

}
export async function rejectBooking(req, res) {
    const id = req.params.id

    try {

        const updateBooking = await BookingModel.findById(id);
        updateBooking.isAccepted = -1;
        await updateBooking.save();
        res.status(200).json({
            msg: 'Update Success'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Cannot update'
        })
    }

}
export async function getStatusBooking(req, res) {

    let status = req.query.isAccepted;
    try {
        const allBookings = await BookingModel.find({ isAccepted: status })
        res.status(200).json(
            allBookings
        )
    } catch (error) {
        res.status(500).json({
            msg: 'Failed'
        })
    }
}
export async function getAcceptedBookings(req, res) {
    try {
        const allBookings = await BookingModel.find({ isAccepted: 1 })
        res.status(200).json(
            allBookings
        )
    } catch (error) {
        res.status(500).json({
            msg: 'Failed'
        })
    }
}
export async function getRejectedBookings(req, res) {
    try {
        const allBookings = await BookingModel.find({ isAccepted: -1 })
        res.status(200).json(
            allBookings
        )
    } catch (error) {
        res.status(500).json({
            msg: 'Failed'
        })
    }
}
export async function getWaitingBookings(req, res) {
    try {
        const allBookings = await BookingModel.find({ isAccepted: 0 })
        res.status(200).json(
            allBookings
        )
    } catch (error) {
        res.status(500).json({
            msg: 'Failed'
        })
    }
}
export async function getBookingOfUser(req, res) {
    let userId = req.params.id
    try {
        const booking = await BookingModel.find({ user: userId })
        res.status(200).json(
            booking
        )
    } catch (error) {
        res.status(500).json({
            msg: 'Failed'
        })
    }
}
export async function setPaymentStatus(req, res) {
    const id = req.params.id

    try {

        const updateBooking = await BookingModel.findById(id);
        updateBooking.payment = 1;
        await updateBooking.save();
        res.status(200).json({
            msg: 'Update Success'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Cannot update'
        })
    }

}