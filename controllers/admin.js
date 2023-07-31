import UserModel from "../model/User.model.js";

export async function getCustomers(req, res) {
    const active = req.query.active;
    const fullName = req.query.fullName;
    try {
        const users = await UserModel.find({ roleId: '1', isActive: active, fullName: { $regex: fullName, $options: 'i' } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export async function getMentors(req, res) {
    const active = req.query.active
    const fullName = req.query.fullName
    try {
        const users = await UserModel.find({ roleId: '2', isActive: active, fullName: { $regex: fullName, $options: 'i' } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export async function getStaffs(req, res) {
    const active = req.query.active
    const fullName = req.query.fullName
    try {
        const users = await UserModel.find({ roleId: '3', isActive: active, fullName: { $regex: fullName, $options: 'i' } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export async function getAdmins(req, res) {
    const active = req.query.active
    const fullName = req.query.fullName
    try {
        const users = await UserModel.find({ roleId: '4', isActive: active, fullName: { $regex: fullName, $options: 'i' } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}