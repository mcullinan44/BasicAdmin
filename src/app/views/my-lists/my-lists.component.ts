import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss']
})
export class MyListsComponent implements OnInit {
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  userName: any;

  constructor(private apiService: ApiService) { 
    this.apiService = apiService;
  }

  ngOnInit() {
    this.apiService.getData().subscribe(data => {    
      this.userName = data;

      
    }, error => {

    });
  }
}
