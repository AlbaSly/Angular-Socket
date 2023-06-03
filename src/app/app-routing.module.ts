import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { userGuard } from './guards/user.guard';
import { userStoredGuard } from './guards/user-stored.guard';

/**Declaración de rutas */
const APP_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [userStoredGuard],
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [userGuard],
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(APP_ROUTES),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
