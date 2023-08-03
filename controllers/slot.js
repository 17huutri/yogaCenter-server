//CRUD slot 
import SlotModel from "../model/Slot.model.js";

export async function createSlot(req, res) {
    const {
        grade,
        user,
        date,
        isAttended,

    } = req.query
    try {
        debugger
        let day = new Date(date);
        day.setHours(7);
        day.setMinutes(0);
        day.setSeconds(0);
        day.setMilliseconds(0);
        // debugger
        const existSlot = await SlotModel.findOne({ grade: grade, user: user, date: day })
        if (existSlot != null) {
            existSlot.isAttended = isAttended || existSlot.isAttended;
            await existSlot.save();
            res.status(200).json(existSlot)
        } else {

            const newSlot = await SlotModel.create({
                grade,
                user,
                date: day,
                isAttended: isAttended || 0,
            })
            // debugger
            res.status(201).json(newSlot)
        }


    } catch (error) {
        res.status(500).json({
            msg: 'Failed haha   '
        })
    }
}

export async function getAllSlotOfUser(req, res) {
    const id = req.params.id
    try {
        // debugger
        const allSlot = await SlotModel.find({ user: id })
        res.status(200).json(allSlot)
    } catch (error) {
        res.status(500).json({
            msg: 'Sever error !!!'
        })
    }
}