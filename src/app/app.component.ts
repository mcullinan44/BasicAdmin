import { Component } from '@angular/core';
import { AuthenticationService } from './services/AuthenticationService.service';
import { Router, RouterOutlet } from '@angular/router';  
import { trigger, state, style, animate, transition, query, group, animateChild} from '@angular/animations';
import {User} from './models/User';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class AppComponent {
  title = 'List Manager';
  currentUser: User;
  applicationName = 'List Manager'
  isOpen = false;

  constructor( private router: Router, private authenticationService: AuthenticationService) 
  { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }  

  logout() {
    this.authenticationService.logout();
  }

  togglemenu() {
    $('.sidenav').toggleClass('active');
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  prepareRoute(outlet: RouterOutlet) {
    console.log(outlet)
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
