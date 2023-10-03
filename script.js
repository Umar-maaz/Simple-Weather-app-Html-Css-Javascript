document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("cityInput");
    const countryInput = document.getElementById("countryInput");
    const searchButton = document.getElementById("searchButton");
    const clearButton = document.getElementById("clearButton");
    const cityName = document.getElementById("cityName");
    const countryName = document.getElementById("countryName");
    const temperature = document.getElementById("temperature");
    const condition = document.getElementById("condition");
    const errorMessage = document.getElementById("errorMessage");
    const weatherInfo = document.querySelector(".weather-info");

    searchButton.addEventListener("click", () => {
        const city = cityInput.value.trim();
        const country = countryInput.value.trim();

        if (!city || !country) {
            errorMessage.textContent = "Please fill in both city and country.";
            errorMessage.style.display = "block";
            weatherInfo.classList.remove("show"); // Hide weather info on error
            return;
        }

        errorMessage.textContent = "";
        errorMessage.style.display = "none";

        const apiKey = '7b6a8a495a9a76b2fa77863e89fd8a26';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                cityName.textContent = data.name;
                countryName.textContent = data.sys.country;
                temperature.textContent = data.main.temp;
                condition.textContent = data.weather[0].description;

                // Add the 'show' class to display the weather info with animation
                weatherInfo.classList.add("show");
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                cityName.textContent = "City not found";
                countryName.textContent = "";
                temperature.textContent = "";
                condition.textContent = "";
                
                // Remove the 'show' class to hide the weather info on error
                weatherInfo.classList.remove("show");
            });
    });

    clearButton.addEventListener("click", () => {
        cityInput.value = "";
        countryInput.value = "";
        cityName.textContent = "";
        countryName.textContent = "";
        temperature.textContent = "";
        condition.textContent = "";
        errorMessage.textContent = "";
        errorMessage.style.display = "none";
        weatherInfo.classList.remove("show"); // Hide weather info when clearing
    });
});
