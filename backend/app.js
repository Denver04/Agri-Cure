const express = require('express')
const {spawn} = require('child_process');
const multer = require("multer");
const path = require('path')
// const fs = require("fs");

const app = express()
const port = 8000

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads");
    },
    filename : (req, file , cb) => {
        // console.log(file);
        cb(null , Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage : storage})

app.use((req,res,next)=>{ //cors
    res.setHeader("Access-Control-Allow-Origin" , '*');
    res.setHeader("Access-COntrol-Allow-Headers",
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader("Access-Control-Allow-Methods", 'GET, POST , DELETE');

    next();
})

app.post('/upload-image', upload.single('meimage') , (req, res) => {
 
    var dataToSend;
    const python = spawn('python', ['script.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
    //  dataToSend = data.toString();
     res.send(data);
    });
    python.on('close', (code) => {
    res.send(dataToSend)
    });
     
   })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))