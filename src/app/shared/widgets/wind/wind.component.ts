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
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.scss']
})
export class WindComponent implements OnInit {
  types: Type[] = [
    { value: 'line', viewValue: 'line' },
    { value: 'bar', viewValue: 'bar' },
    { value: 'column', viewValue: 'column' }
  ];

  colors: Color[] = [
    { value: '#f1c40f', viewValue: 'Sun flower' },
    { value: '#e67e22', viewValue: 'Carrot' },
    { value: '#e74c3c', viewValue: 'Alizarin' },
    { value: '#95a5a6', viewValue: 'Concrete' }
  ];

  selectedColor: any;
  selectedValue: String = this.types[0].value;
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
              text: 'Скорость ветра'
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
              name: 'Скорость ветра',
              data: wind
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
