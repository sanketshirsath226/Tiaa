import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import UserRoute from './routers/UserRoute.js';
import AuthRoute from "./routers/AuthRoute.js";
import multer from "multer";
import path from "path";

const app = express();
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())
dotenv.config()

mongoose
    .connect(process.env.MONGO_DB, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    } 
    )
    .then(()=>app.listen(process.env.PORT, ()=>console.log(`Listening at ${process.env.PORT}`)))
    .catch((error)=>console.log(error));
    // storage engine 
    
    const storage = multer.diskStorage({
        destination: './public/images',
        filename: (req, file, cb) => {
            return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
    })
    
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 100000000000
        }
    })
    
    app.use('/profile', express.static('public/images'));
    app.post("/upload", upload.single('profile'), (req, res) => {
        console.log("Entered");
        res.json({
            success: 1,
            profile_url: `http://localhost:5000/profile/${req.file.filename}`
        })
    })
    
    function errHandler(err, req, res, next) {
       console.log("Entered")
        if (err instanceof multer.MulterError) {
            res.json({
                success: 0,
                message: err.message
            })
        }
    }
    app.use(errHandler);
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)