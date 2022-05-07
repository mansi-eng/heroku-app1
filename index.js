//using partials
//enter this url while running the wether file
//http://localhost:3000/weather?name=pune
const requests = require("requests");
const path = require('path');
const express =  require("express");
const app = express();
const hbs=require('hbs');
const port = process.env.PORT || 3000;
//console.log(path.join(__dirname,"../templates"));
const template = path.join(__dirname,"/template/views");
const partialPath = path.join(__dirname,"/template/partial");
//const templatepath = path.join(template,"/views");
//console.log(path.join(template,"/views"));
console.log(template);
console.log(__dirname);
//to set the view engine
app.set("view engine", "hbs");
app.set("views", template);
hbs.registerPartials(partialPath);
app.get("/",(req,res)=>{
    res.render("index",{
        name:"mansi",
    });
});



app.get("/weather",(req,res)=>{
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=89dbd5425362e1becfc3e67c4b660a4c`)
    .on("data",(chunk)=> {
        const objdata=JSON.parse(chunk);
        const arrdata=[objdata];
        console.log(arrdata);
        console.log(`city name is " ${arrdata[0].name} and temp is ${arrdata[0].main.temp} `);
        
       res.write(arrdata[0].name);
    })
      .on("end",(err)=>{
      if(err) return console.log("connection ends");
      console.log("end");
      res.end();
  })
});
//if we dont have a page or user enter wrong page url
app.get("*",(req,res)=>{
    res.render("404",{
        errormsg:"SOORY currely we dont have this file",
    });
});
app.listen(port,()=>{
    console.log("listening at 3000");
})