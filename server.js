import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import * as dotenv from 'dotenv'
import multer from 'multer';
import connect from './database/conn.js';
import router from './router/route.js';
import adminRouter from './router/admin.js'

import Upload from './model/Upload.js';
import blogRouter from './router/blog.js'
import gradeRouter from './router/grade.js'
import bookingRouter from './router/booking.js'
import courseRouter from './router/course.js'
import customerRouter from './router/customer.js'
// import mentorRouter from './router/mentor.js'

dotenv.config()
const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});
app.get("/getUpload/:id", async (req, res) => {
    const id = req.params.id
    try {
        debugger
        const file = await Upload.findOne({ _id: id })
        // res.status(200).json(
        //     file.file.contentType
        // )
        res.contentType(file.file.contentType);
        res.send(file.file.data)
    } catch (error) {
        res.status(500).send("Server Error");
    }
})
app.post("/upload", upload.single("file"), async (req, res) => {
    // req.file can be used to access all file properties
    try {
        //check if the request has an image or not
        if (!req.file) {
            res.json({
                success: false,
                message: "You must provide at least 1 file"
            });
        } else {
            
            let imageUploadObject = {
                file: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                },
                name: req.file.originalname
            };
            
            const uploadObject = await Upload(imageUploadObject);
            // saving the object into the database
            const uploadProcess = await uploadObject.save();
            res.status(200).json(uploadProcess)
            
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
/** api routes */
app.use('/api', router)
app.use('/admin', adminRouter)

app.use('/blog', blogRouter)
app.use('/booking', bookingRouter)
app.use('/grade', gradeRouter)
app.use('/course', courseRouter)
app.use('/customer', customerRouter)
// app.use('/mentor', mentorRouter)

/** start server only when we have valid connection */
app.listen(port, async (req, res) => {
    connect()
    console.log(`Listening on port : ${port}`)
})
