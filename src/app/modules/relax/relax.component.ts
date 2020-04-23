import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relax',
  templateUrl: './relax.component.html',
  styleUrls: ['./relax.component.scss']
})
export class RelaxComponent implements OnInit {

  WeatherData: any;

  constructor() { }

  ngOnInit(): void {
    this.WeatherData = {
      main: {},
      isDay: true
    }
    this.getData();
    console.log(this.WeatherData)
  }

  getData() {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=Petrozavodsk&appid=73270ebce9f8ff2852e847ce933ce7cd')
      .then(response => response.json())
      .then(data => { this.setWeatherData(data) })
  }

  setWeatherData(data) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.wind = this.WeatherData.wind.speed;
    this.WeatherData.isDay = (currentDate.getDate() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
  }
}
