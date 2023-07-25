//CRUD 
import BlogModel from "../model/Blog.model.js";

export async function createBlog(req, res) {
    const {
        title,
        content,
        _image,
        user,

    } = req.body
    try {
        const existingBlog = await BlogModel.find({title : title})
        if (existingBlog.length != 0) return res.status(409).json({error : "Blog already exist"})
        const newBlog = await BlogModel.create({

            title,
            content,
            _image: _image || '',
            user

        })
        debugger
        res.status(201).json({
            msg: 'Create new blog success',
            data: newBlog
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Failed'
        })
    }
}
export async function getAllBlogs(req, res) {
    try {
        const allBlogs = await BlogModel.find().populate({ path: 'user', select: 'username' })
        res.status(200).json(
            allBlogs
        )
    } catch (error) {
        res.status(500).json({
            msg: 'Failed'
        })
    }
}
export async function deleteBlog(req, res) {
    const id = req.params.id
    try {
        const deleteBlog = await BlogModel.deleteOne({ _id: id })
        res.status(202).json({
            msg: 'Delete Success'
        })
    } catch (error) {
        res.status(204).json({
            msg: 'Cannot delete'
        })
    }
}
export async function updateBlog(req, res) {
    const id = req.params.id
    const {
        title,
        content,
        _image
    } = req.body
    try {
        const updateBlog = await BlogModel.findById({ _id: id })
        updateBlog.title = title || updateBlog.title;
        updateBlog.content = content || updateBlog.content;
        updateBlog._image = _image || updateBlog._image;
        await updateBlog.save()
        res.status(200).json({
            msg: 'Update Success'
        })
    } catch (error) {
        res.status(204).json({
            msg: 'Cannot update'
        })
    }
}