// var mammoth = require("mammoth");
// var pdf = require('html-pdf');

// function convertToPdf(inputDocFilePathWithFileName, outputDocFilePathWithFileName, callback) {
//   mammoth.convertToHtml({
//       path: inputDocFilePathWithFileName
//     })
//     .then(function (result) {
//       var html = result.value; // The generated HTML 
//       pdf.create(html).toFile(outputDocFilePathWithFileName, function (err, res) {
//         if (err) {
//           callback(err);
//           console.log(err);
//           return;
//         }
//         callback(null, res);
//       });
//       var messages = result.messages; // Any messages, such as warnings during conversion 
//       console.log(messages);
//     })
//     .done();
// }

// module.exports = convertToPdf;

let express=require('express')
let bodyparser=require('body-parser')
const path=require ('path')
const multer=require('multer')
let docxtopdf=require('docx-pdf')
var storage=multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,"uploads");
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    },
})
var upload=multer({storage: storage});
const app=express()
app.use(express.static('uploads'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.get('/',(req,res)=>{
    res.sendFile(__dirname +"/index.html")
})
app.post("/docxtopdf",upload.single('file'),(req,res)=>{
    console.log(req.file.path)
    let outputfilepath=Date.now()+"output.pdf"

    docxtopdf(req.file.path,outputfilepath,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.download(outputfilepath,() => {

            })
        }
    })
})

app.listen(5000,()=>{
    console.log("App is listening on port 5000")
})

// var docxConverter=require('docx-pdf');
// docxConverter('./cover page.docx','./result.pdf',function(err,result){
//     if(err){
//         console.log(err);
//     }
//     console.log('result'+result);
// }); 
