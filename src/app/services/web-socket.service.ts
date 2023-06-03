import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  /**Booleano que determina si la conexión al socket está activa o no */
  socketStatus: boolean = false;
  /**Socket User */
  user: IUser | null = null;

  /**
   * 
   * @param socket Atributo socket desde donde se manejará la información en tiempo real
   */
  constructor(
    private socket: Socket,
    private localStorageService: LocalStorageService,
  ) { 
    this.checkStatus().then(() => this.loadStoredUser());
  }

  /**
   * Obtener el estado de la conexión del socket entre cliente - servidor
   */
  checkStatus(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => {
        console.log('Conectado al servidor');
        this.socketStatus = true;
        resolve();
      });
      this.socket.on('disconnect', () => {
        console.log('Desconectado al servidor');
        this.socketStatus = false;
        resolve();
      });
    });
  }

  /**Conectarse nuevamente al servidor del socket */
  connect() {
    this.socket.connect();
  }

  /**Desconectarse del servidor del socket y remover el usuario almacenado por ese socket */
  disconnect() {
    this.localStorageService.removeItem("user");
    this.user = null;
    
    this.socket.disconnect();
  }

  /**
   * Disparar un evento hacia el servidor
   * @param event nombre del evento que se desea disparar por medio del socket
   * @param payload datos a enviar al servidor por medio del socket
   * @param callback Función a llamar una vez finalizada la emisión del evento
   */
  emit(event: string, payload?: any, callback?: Function): void {
    /**Validar primero que exista una conexión establecida a través del socket */
    if (!this.socketStatus) return;
    this.socket.emit(event, payload, callback);
  }

  /**
   * Escuchar cualquier evento desde el servidor en tiempo real
   * @param event nombre del evento que se desea escuchar
   * @returns Observable con la información traída del servidor en tiempo real
   */
  listen(event: string): Observable<unknown> {
    return this.socket.fromEvent(event);
  }

  /**
   * Conectarse al servidor web socket con un usuario específico
   * @param user usuario
   */
  loginWebSocket(user: IUser): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.emit('set-user', user, (resp: any) => console.log(resp));
      this.user = user;
      this.storeUser();

      resolve();
    });
  }

  /**
   * Obtener el usuario
   * @returns Usuario o nulo
   */
  getUser(): IUser | null {
    return this.user;
  }

  /**
   * Almacenar el usuario conectado en el servicio de sockets de manera local para persistencia del mismo 
   */
  private storeUser(): void {
    if (this.user) {
      if (this.user?.username.trim().length === 0) return;

      this.localStorageService.setItem<IUser>("user", this.user);
    }
  }

  /**
   * Cargar el usuario almacenado en el localstorage
   */
  private async loadStoredUser(): Promise<void> {
    const userStored = this.localStorageService.getItem<IUser>("user");

    if (userStored) {
      await this.loginWebSocket(userStored);
      this.user = userStored;
    }
  }
}
