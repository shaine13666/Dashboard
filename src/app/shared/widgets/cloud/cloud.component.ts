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
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.scss']
})
export class CloudComponent implements OnInit {
  types: Type[] = [
    { value: 'line', viewValue: 'line' },
    { value: 'bar', viewValue: 'bar' },
    { value: 'column', viewValue: 'column' }
  ];

  colors: Color[] = [
    { value: '#1abc9c', viewValue: 'Turquoise' },
    { value: '#2ecc71', viewValue: 'Emerald' },
    { value: '#3498db', viewValue: 'Petre River' },
    { value: '#9b59b6', viewValue: 'Amethyst' },
    { value: '#ecf0f1', viewValue: 'Clouds' }
  ];

  selectedColor: any;
  selectedValue: String = this.types[2].value;
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
          let alldates = data['list'].map(data => data.dt);
          let clouds = data['list'].map(data => data.clouds.all);
          let weatherDates = [];
          alldates.forEach((res) => {
            let jsdate = new Date(res * 1000);
            weatherDates.push(jsdate.toLocaleDateString('ru', { year: 'numeric', month: 'short', day: 'numeric' }))
          });

          this.Highcharts = Highcharts;
          this.chartOptions = {
            chart: {
              type: 'column',
            },
            title: {
              text: 'Облака'
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
              name: 'Количество облаков',
              data: clouds
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
