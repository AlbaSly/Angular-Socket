import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/**Sockets */
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.development';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginComponent } from './pages/login/login.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { AppRoutingModule } from './app-routing.module';

/**Configuración del socket */
const config: SocketIoConfig = { 
  url: environment.wsUrl, 
  options: {} 
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent,
    UserListComponent,
    LoginComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    /**Módulo de Sockets */
    SocketIoModule.forRoot(config),
    /**Módulo de rutas */
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
