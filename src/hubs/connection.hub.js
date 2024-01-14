import { Server, Socket } from "socket.io";
import { SocketUtils } from "../utils/socket.utils.js";
import { UserDTO } from "../dto/user.dto.js";

/**
 * @type { Object.<string, (io: Server, socket: Socket, ...params: any[]) => void> } 
 */
export const ConnectionHub = {
  connect: (io, socket) => {
    const connectedUsers = SocketUtils.allUsers(io);
    // socket.emit envoyer au "caller"
    socket.emit('info', 'Vous êtes connecté au serveur');
    socket.join(socket.user.id);
    
    // s'il n'est pas encore connecté
    if(!connectedUsers.some(u => u.username === socket.user.username)) {
      // socket.broadcast.emit à tous les clients sauf le "caller"
      socket.broadcast.emit('info', `${socket.user.username} est connecté`);
    }
    
    // io.emit envoyer à tous les clients
    io.emit('connectedUsers', connectedUsers.map(u => new UserDTO(u)));
  },
  disconnect: (io, socket) => {
    const connectedUsers = SocketUtils.allUsers(io);
    if(!connectedUsers.some(u => u.username === socket.user.username)) {
      io.emit('info', `${socket.user.username} est déconnecté`);
      io.emit('connectedUsers', connectedUsers.map(u => new UserDTO(u)));
    }
  },
}