import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/**Sockets */
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.development';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';

/**Configuración del socket */
const config: SocketIoConfig = { 
  url: environment.wsUrl, 
  options: {} 
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
