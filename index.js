const express = require('express');
const path = require('path');
const Files = require('./models/file')
const connectedTomongoDB = require('./db');
const cors = require('cors');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req,file,callback) =>{
        console.log(file);
        callback(null, './uploads');
    },
    filename: (req,file,callback) =>{
        console.log(file);
        callback(null,`${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({storage})
const app = express();
require('dotenv').config();
const Port = process.env.PORT || 5000;
connectedTomongoDB(process.env.MongoURI);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET","POST","PATCH","DELETE"],
    credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname,"uploads")));
 

app.post('/upload', upload.single("profileImage"), async (req,res)=>{
    console.log(req.file);
    try {
        await Files.create({
            fileUrl: req.file.path
           })
    } catch (error) {
        res.status(500).json({success: false, msg: "Internal Server Error"})
    }
})

app.get('/',(req,res)=>{
    res.send("working")
})

app.get('/links',async (req,res)=>{
    const links = await Files.find();
    res.send(links);
})

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`);
})
