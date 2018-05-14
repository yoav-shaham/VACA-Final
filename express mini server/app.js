const fs = require('fs');
const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });  

app.get('/command',function(req,res){
    let file = fs.readFileSync('commands.json')
    file=JSON.parse(file)
    res.json(file)
    console.log("het")
})
app.post("/command",function(req,res){
let file = fs.readFileSync('commands.json');
file=JSON.parse(file);
file.commands.push(req.body)
fs.writeFile("commands.json",JSON.stringify(file),function(err){
    console.log(err)
    console.log("occured")
})

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))