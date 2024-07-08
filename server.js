const express = require('express');
const axios = require('axios'); // Import Axios for making HTTP requests
const app = express();

async function boost() {
    try {
        const response = await axios.get("https://newsserver-9j89.onrender.com/api/news/boost");
        const data = response.data;
        console.log(data.msg);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Call boost() immediately when server starts
boost();

// Set up interval to call boost() every 30 seconds
setInterval(boost, 30000);

const PORT = process.env.PORT || 8000; // Use environment variable for port if available

app.listen(PORT, () => {
    console.log(`App is listening on port : ${PORT}`);
});
