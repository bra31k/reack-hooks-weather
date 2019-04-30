import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

    const cityDict = {
        "Yekaterinburg":"Екатеринбург",
        "Moscow":"Москва",
        "Novosibirsk":"Новосибирск"
    }

    const [weather, setWeather] = useState({
        temp: null,
        humidity: null,
        wind: null,
        clouds: null,
    })

        const [city, setCity] = useState("Yekaterinburg")


    function getWeather(city) {
        axios.get('https://community-open-weather-map.p.rapidapi.com/weather',
            {
                headers:
                    {
                        "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com" ,
                        "X-RapidAPI-Key": "f1e73284aemsh1428a13af664c73p1453f0jsnc4a7338698d8"
                    },
                params: {
                    units: "metric",
                    q: `${city},ru`
                }
            }).then(function (response) {
                setWeather(({
                    temp: response.data.main.temp,
                    humidity: response.data.main.humidity,
                    wind: response.data.wind.speed,
                    clouds: response.data.clouds.all
                }))
        })
    }

    useEffect(() => {
        getWeather(city)
    }, [city]);



    return (
        <div>
            <h2>Погода</h2>
            <h3>Выберете ваш город:</h3>
            <select onChange={()=>setCity(event.target.value)}>
                <option value={"Yekaterinburg"}>Екатеринбург</option>
                <option value={"Moscow"}>Москва</option>
                <option value={"Novosibirsk"}>Новосибирск</option>
            </select>
            <h4>Ваш город {cityDict[city]}</h4>
            <p>
                Температура воздуха равна {weather.temp}, влажность {weather.humidity}%, ветер до {weather.wind} м/c,
                { weather.clouds < 25 ? " ясно" : weather.clouds < 70 ? " облачно с прояснениями" : " облачно" }
            </p>
        </div>
    );
}

export default App;