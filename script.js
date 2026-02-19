const weatherForm = document.querySelector(".formWeather");
const cityInput = document.querySelector(".cityInput");

const card = document.querySelector(".card");
const apiKey = "e54e93480410a97a17ce500fa09aeadd";

weatherForm.addEventListener("submit", async (event) => {
	event.preventDefault();
	const city = cityInput.value;

	if (city) {
		try {
			const weatherData = await getWeather(city);
			displayWeatherInfo(weatherData);
		} catch (e) {
			console.log(e);
			displayError(e);
		}
	} else {
		displayError("Please enter a city");
	}
});

async function getWeather(city) {
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

	const response = await fetch(apiUrl);

	if (!response.ok) {
		throw new Error("Could not fetch weather data");
	}

	return await response.json();
}

function displayWeatherInfo(data) {
	const {
		name: city,
		main: { temp, humidity },
		weather: [{ description, id }],
	} = data;
	card.textContent = "";
	card.style.display = "flex";

	const cityDisplay = document.createElement("h1");
	const tempDisplay = document.createElement("p");
	const humidityDisplay = document.createElement("p");
	const descDisplay = document.createElement("p");
	const weatherEmoji = document.createElement("p");

	cityDisplay.textContent = city;
	const celsius = (temp - 273.15).toFixed(1);
	tempDisplay.textContent = `${celsius}°C`;
	humidityDisplay.textContent = `Humidity: ${humidity}%`;
	descDisplay.textContent = description;
	weatherEmoji.textContent = getWeatherEmoji(id);

	tempDisplay.classList.add("tempDisplay");
	cityDisplay.classList.add("cityDisplay");
	descDisplay.classList.add("descDisplay");
	weatherEmoji.classList.add("weatherEmoji");

	card.appendChild(cityDisplay);
	card.appendChild(tempDisplay);
	card.appendChild(humidityDisplay);
	card.appendChild(descDisplay);
	card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
	switch (true) {
		case weatherId >= 200 && weatherId < 300:
			return "⛈";

		case weatherId >= 300 && weatherForm < 400:
			return "🌧";

		case weatherId >= 500 && weatherForm < 600:
			return "☔";

		case weatherId >= 600 && weatherForm < 700:
			return "❄";

		case weatherId >= 700 && weatherForm < 800:
			return "🌫";
		case weatherId == 800:
			return "☀";

		case weatherId >= 801 && weatherId < 810:
			return "☁";

		default:
			return "❓";
	}
}

function displayError(message) {
	const errorDisplay = document.createElement("p");
	errorDisplay.textContent = message;
	errorDisplay.classList.add("errorDisplay");

	card.textContent = "";
	card.style.display = "flex";
	card.appendChild(errorDisplay);
}
