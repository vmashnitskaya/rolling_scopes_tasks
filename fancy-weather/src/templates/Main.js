const Main = () => `
<main>
<div class="container">
    <div class="forecast">
        <div class="weather">
            <div class="location">Minsk, Belarus</div>
            <div class="time">
                <span class="time__date">Mon 28 October</span>
                <span class="time__timer">17:23</span>
            </div>
            <div class="day">
                <div class="day__temperature">10</div>
                <div class="day__info">
                    <div class="day__info-animation"><img src="./img/animation.png" alt="weather image"></div>
                    <div class="day__info-text">
                        <div class="overview">overcast</div>
                        <div class="feeling">Feels like: 7°</div>
                        <div class="wind">Wind: 2 m/s</div>
                        <div class="humidity">Humidity: 83%</div>
                    </div>
                </div>
            </div>
            <div class="following-days">
                <div class="following-day">
                    <div class="following-day__day">Tuesday</div>
                    <div class="following-day__weather">
                        <div class="following-day__weather-temperature">27°</div>
                        <div class="following-day__weather-animation"><img src="./img/cloud.png" alt="weather image"></div>
                    </div>
                 </div>
                <div class="following-day">
                    <div class="following-day__day">Tuesday</div>
                    <div class="following-day__weather">
                        <div class="following-day__weather-temperature">27°</div>
                        <div class="following-day__weather-animation"><img src="./img/cloud.png" alt="weather image"></div>
                    </div>
                </div>
                <div class="following-day">
                    <div class="following-day__day">Tuesday</div>
                    <div class="following-day__weather">
                        <div class="following-day__weather-temperature">27°</div>
                        <div class="following-day__weather-animation"><img src="./img/cloud.png" alt="weather image"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="map">
            <div><img src="./img/Map.png" alt="map"></div>
        </div>
    </div>
</div>
</main>
`;

export default Main;
