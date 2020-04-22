import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WeatherService } from 'src/app/weather.service';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})

export class LineComponent implements OnInit {
  selectedValue: String;
  loading = true;
  Highcharts = Highcharts;
  chartOptions: any;

  types: Type[] = [
    { value: 'line', viewValue: 'line' },
    { value: 'bar', viewValue: 'bar' },
    { value: 'column', viewValue: 'column' }
  ];

  constructor(private _weather: WeatherService) { }

  ngOnInit(): void {
    this._weather.dailyForecast()
      .subscribe(
        data => {
          let temp_max = data['list'].map(data => +(data.main.temp_max - 273.15).toFixed(1));
          let temp_min = data['list'].map(data => +(data.main.temp_min - 273.15).toFixed(1));
          let alldates = data['list'].map(data => data.dt);
          let seaLevel = data['list'].map(data => data.main.sea_level);
          let wind = data['list'].map(data => data.wind.speed);

          let weatherDates = [];
          alldates.forEach((res) => {
            let jsdate = new Date(res * 1000);
            weatherDates.push(jsdate.toLocaleDateString('ru', { year: 'numeric', month: 'short', day: 'numeric' }))
          });

          this.Highcharts = Highcharts;
          this.chartOptions = {
            chart: {
              type: 'line',
            },
            title: {
              text: 'График погоды'
            },
            subtitle: {
              text: 'г. Москва'
            },
            xAxis: {
              categories: weatherDates
            },
            series: [{
              name: 'Максимальная температура',
              data: temp_max
            }, {
              name: 'Минимальная температура',
              data: temp_min
            }, {
              name: 'Скорость ветра',
              data: wind
            }, {
              name: 'Уровень моря',
              data: seaLevel
            }],
          };
          this.loading = false;
        },
        () => { });
  }
}
