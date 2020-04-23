import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WeatherService } from 'src/app/weather.service';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

interface Type {
  value: string;
  viewValue: string;
}

interface Color {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-mintemperature',
  templateUrl: './mintemperature.component.html',
  styleUrls: ['./mintemperature.component.scss']
})
export class MintemperatureComponent implements OnInit {
  types: Type[] = [
    { value: 'line', viewValue: 'line' },
    { value: 'bar', viewValue: 'bar' },
    { value: 'column', viewValue: 'column' }
  ];

  colors: Color[] = [
    { value: '#f39c12', viewValue: 'Orange' },
    { value: '#d35400', viewValue: 'Pumpkin' },
    { value: '#c0392b', viewValue: 'Pomegranate' },
    { value: '#bdc3c7', viewValue: 'Silver' }
  ];

  selectedColor: any;
  selectedValue: String = this.types[1].value;
  loading = true;
  public Highcharts = Highcharts;
  public chartOptions: any;
  public chartObject: any;

  constructor(private _weather: WeatherService) { }

  ngOnInit(): void {
    this.setChartType(this.selectedValue);
    this.changeColor(this.selectedColor);

    this._weather.dailyForecast()
      .subscribe(
        data => {
          let temp_min = data['list'].map(data => +(data.main.temp_min - 273.15).toFixed(1));
          let alldates = data['list'].map(data => data.dt);

          let weatherDates = [];
          alldates.forEach((res) => {
            let jsdate = new Date(res * 1000);
            weatherDates.push(jsdate.toLocaleDateString('ru', { year: 'numeric', month: 'short', day: 'numeric' }))
          });

          this.Highcharts = Highcharts;
          this.chartOptions = {
            chart: {
              type: 'bar',
            },
            title: {
              text: 'Минимальная температура'
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
              name: 'Минимальная температура',
              data: temp_min
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
          load: function () {
            component.chartObject = this;
          }
        }
      }
    }
  }
  changeColor(selectedColor) {
    const component = this;
    this.chartOptions = {
      plotOptions: {
        series: {
          color: selectedColor
        },
        events: {
          load: function () {
            component.chartObject = this;
          }
        }
      }
    }
  }

}
