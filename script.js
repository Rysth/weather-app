const API = "1a98a8a754fd227f90daa17498d921ab";
const IMAGE = "https://openweathermap.org/img/wn/";

const weatherForm = document.querySelector("#weather__form");
const weatherCity = document.querySelector("#weather__city");

const weatherContent = document.querySelector(
	"#weather__content"
);
const weatherImage = document.querySelector("#weather__image");
const weatherDegree = document.querySelector("#weather__degree");
const weatherState = document.querySelector("#weather__state");

const weatherCardContent = document.querySelectorAll(
	".weather__card--content"
);

weatherForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const cityName = weatherCity.value.trim();
	getWeatherData(cityName);
});

const getWeatherData = async (cityName) => {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}&units=metric`
		);

		if (!response.ok) {
			weatherContent.style.display = "none";
			throw new Error("Network Error provide by the Weather API");
		}

		const data = await response.json();
		const { main, weather, wind } = data;

		console.log(data);

		const icon = weather[0].icon;
		const temperature = Math.round(main.temp);
		const state = weather[0].description;

		const details = [
			`Feels Like: ${Math.round(main.feels_like)}°C`,
			`Humidity: ${main.humidity}%`,
			`Wind Speed: ${wind.speed}m/s`,
		];

		weatherImage.src = `${IMAGE}/${icon}@2x.png`;
		weatherDegree.innerText = `${temperature}°C`;
		weatherState.innerText = `${state}`.toUpperCase();

		for (
			let index = 0;
			index < weatherCardContent.length;
			index++
		) {
			const element = weatherCardContent[index];
			const detail = details[index];

			element.innerHTML = `${detail}`;
		}

		weatherContent.style.display = "block";
	} catch (error) {
		console.log(error);
	}
};
