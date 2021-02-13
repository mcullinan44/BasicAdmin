import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  private apiURL: string;

  constructor(api: AppConfigService) { 
    this.apiURL = api.config.apiURL
  }
  
  
  ListValues : string = `${this.apiURL}` + "/api/values";
  NewList : string = `${this.apiURL}` + "/api/values";
}
