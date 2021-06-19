var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/index.html",(req,res)=>{
    var name = req.body.id;
    var contact = req.body.contact;
    var item = req.body.item;
    var feedback = req.body.feedback;

    var data = {
        "Name": name,
        "Contact" : contact,
        "item" : item,
        "feedback" : feedback,
    }

    db.collection('feedback').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");        
    });
    return res.redirect('index.html');
})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('feedback.html');
}).listen(3001);


console.log("Listening on PORT 3001");