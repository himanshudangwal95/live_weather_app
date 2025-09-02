const apiKey = 'YOUR_API_KEY';

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('location').textContent = '';
        document.getElementById('temperature').textContent = '';
        document.getElementById('description').textContent = 'Error: ' + error.message;
        document.getElementById('wind').textContent = '';
    }
}

function displayWeather(data) {
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').textContent = data.weather.description;
    document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('locationInput').value;
    if (city.trim() !== '') fetchWeather(city);
});

// Live update every 10 minutes (optional: track a default city, or update last searched city)
setInterval(() => {
    const city = document.getElementById('location').textContent.split(',');
    if (city) fetchWeather(city);
}, 600000); // 10 minutes in ms
