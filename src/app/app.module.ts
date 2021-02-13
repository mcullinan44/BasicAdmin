import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './views/shopping-list/shopping-list.component';
import { ListHistoryComponent } from './/views/list-history/list-history.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { RegisterLoginComponent } from './views/register-login/register-login.component';
import { RegisterComponent } from './views/register/register.component';
import { AppConfigService } from './services/app-config.service';
import { MatSliderModule } from '@angular/material/slider';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule, MatSidenavModule,MatCheckboxModule, MatGridListModule
} from '@angular/material';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { AlertComponent } from './views/alert/alert.component';
import { MyListsComponent } from './views/my-lists/my-lists.component';
import { CreateListComponent } from './views/create-list/create-list.component';
import {EndpointService } from './services/endpoint.service';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ListHistoryComponent,
    LoginComponent,
    RegisterLoginComponent,
    RegisterComponent,
    SidemenuComponent,
    AlertComponent,
    MyListsComponent,
    CreateListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatButtonModule, 
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatGridListModule
  ],
  providers: [
    AuthService, 
    {
      provide: AuthServiceConfig
    },
    AuthGuard ,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ,AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    },EndpointService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
