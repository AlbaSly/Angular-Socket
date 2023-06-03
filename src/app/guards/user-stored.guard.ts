import { CanActivateFn, Router } from '@angular/router';
import { WebSocketService } from '../services/web-socket.service';
import { inject } from '@angular/core';

/**
 * Guard para validar si ya existe un usuario almacenado en el local storage, y así evitar el acceso a la patanlla de Login
 * @param route 
 * @param state 
 * @returns 
 */
export const userStoredGuard: CanActivateFn = async (route, state) => {
  
  /**Inyección del WebSocketServices */
  const _WebSocketService: WebSocketService = inject(WebSocketService);
  /**Inyección del Router */
  const _Router: Router = inject(Router);

  /**Verificar conexión al servicio de sockets */
  await _WebSocketService.checkStatus();

  /**Si no hay usuario, permitir acceso al login */
  if (!_WebSocketService.getUser()) return true;

  /**Caso contrario, mandar a la pantalla de mensajes */
  _Router.navigateByUrl('/messages');
  return false;
};
