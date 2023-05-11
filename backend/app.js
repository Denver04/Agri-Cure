const express = require('express')
const {spawn} = require('child_process');
// const router = require('./routes/image');
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
// const fs = require("fs");


const app = express()
const port = 8000
const MIME_TYPE = {
    "meimage/jpg" : "jpg",
    "meimage/png" : "png",
    "meimage/jpeg" : "jpeg"
}
let vr , name;

const upload = multer({ 
    // limits:1000000,
    storage:multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null , "uploads/")
        },
        filename: (req, file , cb) => {
            // console.log("im working");
            const ext = MIME_TYPE[file.mimetype];
            vr = uuidv4();
            // console.log(vr);
            name = vr + '.' + ext;
            cb(null , name);
            // cb(null , Date.now() + '--' + file.originalname)
        }
    }),
    // dest : "/uploads"
 })


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin" , '*');
    res.setHeader("Access-COntrol-Allow-Headers",
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader("Access-Control-Allow-Methods", 'GET, POST , DELETE');

    next();
})

// app.get('/', (req, res, next) => {
//     res.send('Hello World!')
// })

app.post('/start', upload.single('meimage') , (req, res) => {
 
    var dataToSend;
    // spawn new child process to call the python script
    // console.log("python chal rha");
    const python = spawn('python', ['script.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
    //  console.log('Pipe data from python script ...');
    //  dataToSend = data.toString();
    // dataToSend = data.eval();
    // console.log("printing data");
    // console.log(data);
     res.send(data);
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    // console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(dataToSend)
    });
     
   })

//    app.use("/" , router)
//    app.use("/" , router)
   app.listen(port, () => console.log(`Example app listening on port ${port}!`))