/* Global Variables */

// Base URL and API Key for OpenWeatherMap
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=927369740baf796f40519ab5285ecd90&units=metric"; //Requests the temperature in Celsius


const button = document.getElementById('generate');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

// Async function to make a GET request to OpenWeatherMap API
const weatherGET = async (baseURL, newZIP, apiKey) => {
    
    const res = await fetch(baseURL + newZIP + apiKey)
    try{
        const data = await res.json();
        return data;
    }
    catch(error){
        console.log("error", error);
    }
}

// Async function to make a POST request to add the API data
const postData = async (url = '' , data = {}) => {
    const response = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        return newData;
    }
    catch (error) {
        console.log("error", error);
    }
}


// Updating the UI with the date, temperature, and the user's input (Feeling)
const updateUI = async () => {
    const request = await fetch('/get');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('content').innerHTML = `Feeling: ${allData.content}`;
    }
    catch (error) {
        console.log("error", error);

    }

}


// Callback function that executes when the "Generate" button is clicked
function callback (){
    const newZIP = document.getElementById('zip').value;
    weatherGET(baseURL, newZIP, apiKey)   

    .then((data) => {
        const feel = document.getElementById('feelings').value;
        postData('/post', {date: d, temp:data.main.temp, content: feel})
    })
    .then (updateUI)
}



button.addEventListener('click', callback);
