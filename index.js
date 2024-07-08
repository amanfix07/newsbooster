const express = require('express');
const app=express();
async function  boost() {
    const res= await fetch("https://newsserver-9j89.onrender.com/api/news/boost");
    data=await res.json();
    console.log(data.msg)
}
setInterval(()=> {
    boost()
},30000)

app.listen(8000,()=>{
    console.log("App is listening on port : 8000")
})
