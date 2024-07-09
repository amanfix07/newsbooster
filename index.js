const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 8000;

// Function to fetch data from external API
const fetchData = async () => {
    try {
        const response = await axios.get("https://newsserver-9j89.onrender.com/api/news/boost");
        return response.data.msg; // Extracting the message from API response
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null; // Returning null or handling the error appropriately
    }
};

// Endpoint to fetch data immediately and respond
app.get('/api/boost', async (req, res) => {
    try {
        const msg = await fetchData();
        if (msg) {
            console.log(msg);
            res.json({ msg: msg });
        } else {
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    } catch (error) {
        console.error('Error handling request:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to fetch data every 30 seconds
const fetchPeriodically = () => {
    setInterval(async () => {
        try {
            const msg = await fetchData();
            if (msg) {
                console.log(`Fetched data: ${msg}`);
            } else {
                console.log('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }, 30000); // 30 seconds interval
};

// Call fetchData immediately when server starts
fetchData().then(msg => {
    if (msg) {
        console.log(`Initial data: ${msg}`);
    } else {
        console.log('Failed to fetch initial data');
    }
}).catch(error => {
    console.error('Error fetching initial data:', error.message);
});

// Start the server
app.listen(PORT, () => {
    console.log(`App is listening on port : ${PORT}`);
    
    // Start periodic fetching after server starts
    fetchPeriodically();
});
