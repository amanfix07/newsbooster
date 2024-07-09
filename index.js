const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 8000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}
app.get('/api/booster',async (req,res)=>{
    await sleep(15)
    console.log("booster 2")
    try {
        const response = await axios.get("https://newsserver-9j89.onrender.com/api/boost");
        console.log("Call 1");
    } catch (error) {
        console.error('Error fetching data:', error);
      }
    // res.json({msg:"Booster"})
})

app.listen(PORT, () => {
    console.log(`App is listening on port : ${PORT}`);   
});
