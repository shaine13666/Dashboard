import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WeatherService } from 'src/app/weather.service';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

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
  types: Type[] = [
    { value: 'line', viewValue: 'line' },
    { value: 'bar', viewValue: 'bar' },
    { value: 'column', viewValue: 'column' }
  ];
  selectedValue: String = this.types[0].value;
  loading = true;
  public Highcharts = Highcharts;
  public chartOptions: any;
  public chartObject: any;


  constructor(private _weather: WeatherService) { }

  ngOnInit(): void {
    this.setChartType(this.selectedValue);

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
            credits: {
              enabled: false
            },
            exporting: {
              enabled: true
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

  setChartType(selectedValue) {
    const component = this;
    this.chartOptions = {
      chart: {
        type: selectedValue,
        events: {
          load: function() {
            component.chartObject = this;
          }
        }
      }
    }
  }
}
