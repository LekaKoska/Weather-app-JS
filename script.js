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
	const cityData = await fetch(``);
}

function displayWeatherInfo(data) {}

function getWeatherEmoji(weatherId) {}

function displayError(message) {
	const errorDisplay = document.createElement("p");
	errorDisplay.textContent = message;
	errorDisplay.classList.add("errorDisplay");

	card.textContent = "";
	card.style.display = "flex";
	card.appendChild(errorDisplay);
}
