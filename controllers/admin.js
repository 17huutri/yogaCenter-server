import UserModel from "../model/User.model.js";

export async function getCustomers(req, res) {
    const active = req.query.active;
    const username = req.query.username;
    try {
        const users = await UserModel.find({ roleId: '1', isActive: active, username: { $regex: username, $options: 'i' } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export async function getMentors(req, res) {
    const active = req.query.active
    const username = req.query.username
    try {
        const users = await UserModel.find({ roleId: '2', isActive: active, username: { $regex: username, $options: 'i' } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export async function getStaffs(req, res) {
    const active = req.query.active
    const username = req.query.username
    try {
        const users = await UserModel.find({ roleId: '3', isActive: active, username: { $regex: username, $options: 'i' } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export async function getAdmins(req, res) {
    const active = req.query.active
    const username = req.query.username
    try {
        const users = await UserModel.find({ roleId: '4', isActive: active, username: { $regex: username, $options: 'i' } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}