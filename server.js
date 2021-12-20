// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Middleware*/
const bodyParser = require ('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

// Test that server is running
app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});

// Adding a GET route
app.get('/get' , function (req,res){
    res.send(projectData);
});

// Adding a POST route
app.post('/post', addData);

function addData(req, res) {

    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;

    res.send(projectData);

}