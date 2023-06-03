import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';

/**
 * Guard para validar existencia de usuario
 * @param route 
 * @param state 
 * @returns 
 */
export const userGuard: CanActivateFn = async (route, state) => {

  /**Inyección del WebSocketService */
  const _WebSocketService: WebSocketService = inject(WebSocketService);
  /**Inyección del Router */
  const _Router: Router = inject(Router);

  /**Si hay un usuario, permitir entrada a la pantalla de mensajes */
  if (_WebSocketService.getUser()) return true;

  /**Caso contrario, mandar a la pantalla de Login */
  _Router.navigateByUrl('/');
  return false;
};
