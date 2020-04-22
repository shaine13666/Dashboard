import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  
  private _url='http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=73270ebce9f8ff2852e847ce933ce7cd';

  constructor(private _http: HttpClient) { }

  dailyForecast() {
    return this._http.get(this._url) 
  }
}
