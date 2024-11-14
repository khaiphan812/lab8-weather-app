const express = require("express");
const app = express();
const axios = require("axios");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/weather", (req, res) => {
    const city = req.query.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3edf8af66460087574a35f9df988e5bd`;
    axios
        .get(url)
        .then((response) => {
            const weatherData = {
                temperature: response.data.main.temp,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon,
            };
            res.json(weatherData);
        })
        .catch((error) => {
            res.status(500).json({ error: "An error occurred" });
        });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});