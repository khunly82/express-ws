import { Server } from "socket.io";

export const SocketUtils = {
  /**
   * @param {Server} io 
   * @returns {Array}
   */
  allUsers : (io) => [...io.of('/').sockets]
    .filter(socket => socket[1].user)
    .reduce((prev, next) => {
      const user = next[1].user;
      const connectionId = next[0];
      // les utilisateurs peuvent avoir plusieurs connections (depuis leur smartphone et un navigateur par exemple)
      let connected = prev.find(u => u.id === user.id);
      if(!connected) {
        connected = { ...user, connectionIds: [] };
        prev.push(connected);
      }
    connected.connectionIds.push(connectionId);
    return prev;
  }, []),

  /**
   * @param {Server} io 
   * @param {string} id 
   * @returns {Array.<string>}
   */
  getConnectionIds: (io, id) => {
    return SocketUtils
      .allUsers(io)
      .filter(user => user.id === id).map(u => u.connectionIds);
  } 
}