import { Injectable } from '@angular/core';

/**
 * Servicio para la persistencia de datos local, usando el API de LocalStorage
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * Guarda los datos en el LocalStorage, asignándole un nombre
   * @param name nombre para identificar los datos a almacenar
   * @param object datos a almacenar
   */
  setItem<T>(name: string, object: T): void {
    localStorage.setItem(name, JSON.stringify(object));
  }

  /**
   * Devuelve los datos almacenados en el LocalStorage por medio del nombre clave asignado
   * @param name nombre asignado a los datos almacenados
   * @returns El objeto o datos almacenados de acuerdo a ese nombre, o en caso de no existir, un valor nulo
   */
  getItem<T>(name: string): T | null {
    const itemInLocalStorage: string | null = localStorage.getItem(name);

    if (itemInLocalStorage) {
      const item: T = <T>JSON.parse(itemInLocalStorage);
      return item;
    }

    return null;
  }

  /**
   * Elimina los datos almacenados en el LocalStoarge
   * @param name nombre asignado a los datos almacenados
   */
  removeItem(name: string): void {
    localStorage.removeItem(name);
  }
}
