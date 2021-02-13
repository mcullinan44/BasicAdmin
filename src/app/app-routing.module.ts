import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './views/shopping-list/shopping-list.component';
import { ListHistoryComponent } from './views/list-history/list-history.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { RegisterComponent } from './views/register/register.component';
import {MyListsComponent} from './views/my-lists/my-lists.component';
import {CreateListComponent} from './views/create-list/create-list.component';

const routes: Routes = [ 
  { path: 'list', component: ShoppingListComponent,  canActivate: [ AuthGuard  ] },
  { path: 'history', component: ListHistoryComponent,  canActivate: [ AuthGuard  ] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'my-lists', component: MyListsComponent, canActivate: [ AuthGuard  ]},
  { path: 'create-list', component: CreateListComponent, canActivate: [ AuthGuard  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
