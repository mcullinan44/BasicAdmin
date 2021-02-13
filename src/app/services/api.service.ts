import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppConfigService } from './app-config.service';
import {AuthenticationService} from './AuthenticationService.service';
import { List } from '../models/List';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private httpClient: HttpClient, 
    private endpoint: EndpointService) 
    { 
      this.endpoint = endpoint
    }
    
    public getData() {
      return this.httpClient.get<any[]>(`${this.endpoint.ListValues}`);
  }

  public createList() {
    
  }
}
