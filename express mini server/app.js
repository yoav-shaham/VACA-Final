const fs = require('fs');
const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
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
app.delete("/command",function(req,res){
    let file = fs.readFileSync('commands.json');
    file=JSON.parse(file);
    num=null
    console.log("heythere")
    for( x=0; x< file.commands.length && num!=null; i++){
        console.log("aight")
        if (item["commandName"] == req.body){
            console.log( "hey")
            num=x   
        }
    }
    console.log(file)
    file.commands.splice(num,1)
    num=null
    fs.writeFile("commands.json",JSON.stringify(file),function(err){
        console.log(err)
        console.log("occured")
    })
    res.send()
    
    })
    
app.listen(3000, () => console.log('Example app listening on port 3000!'))