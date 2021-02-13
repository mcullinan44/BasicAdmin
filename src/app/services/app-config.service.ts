import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private appConfig;

  constructor(private http: HttpClient ) {  }

  loadAppConfig() {
    return this.http.get('/assets/data/appConfig.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  get config() {
    return this.appConfig;
  }
}
