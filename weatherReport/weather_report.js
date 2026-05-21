function getWeather() {
    const lat = document.getElementById('lat').value.trim();
    const lon = document.getElementById('lon').value.trim();
    const resultDiv = document.getElementById('weatherResult');

    if (!lat || !lon) {
        resultDiv.innerHTML = "<p style='color:red;'>Please enter both Latitude and Longitude.</p>";
        return;
    }

    const apiKey = "44e4a5f8d5437d72c76ed90d80dcdf07";   // ← CHANGE THIS

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.cod !== 200) {
                resultDiv.innerHTML = `<p style='color:red;'>Error: ${data.message}</p>`;
                return;
            }

            const weatherHTML = `
                <h3>Weather in ${data.name}</h3>
                <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                <p><strong>Feels Like:</strong> ${data.main.feels_like} °C</p>
                <p><strong>Condition:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;
            resultDiv.innerHTML = weatherHTML;
        })
        .catch(error => {
            console.error(error);
            resultDiv.innerHTML = `<p style='color:red;'>Error fetching weather data.<br>Please check your API key and internet connection.</p>`;
        });
}