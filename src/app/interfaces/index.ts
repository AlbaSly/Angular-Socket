/**Interfaz para los nombres de usuario */
export interface IUser {
    id: string | null;
    username: string;
    room: string | null;
}

/**Interfaz para los mensajes */
export interface IMessage {
    from: IUser;
    body: string;
}