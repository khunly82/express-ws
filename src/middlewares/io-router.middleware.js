import { Server, Socket } from "socket.io";

export const IoRouter = () => {
  const router = (io) => {
    io.on('connection', (socket) => {
      _handle('connection', io, socket);
    });
    return (socket, next) => {
      _getEventNames().filter(route => route !== 'connection').forEach(route => {
        socket.on(route, (payload) => {
          _handle(route, io, socket, payload);
        });
      });
      next();
    };
  }

  /**
   * @param {string} eventName 
   * @param {Array.<{(io: Server, socket: Socket, payload: any, next: () => {}) => void}>} middlewares 
   */
  router.add = (eventName, ...middlewares) => {
    const event = { eventName, handler: (io, socket, payload, chain) => {
      chain = chain ?? [...middlewares];
      const middleware = chain.shift();
      if(middleware) {
        middleware(io, socket, payload, () => event.handler(io, socket, payload, chain));
      }
    }}
    _events.push(event);
  }

  const _events = [];

  /**
   * @param {string} eventName 
   * @param {Server} io 
   * @param {Socket} socket 
   */
  const _handle = (eventName, io, socket, payload) => {
    _events.find(e => e.eventName === eventName)?.handler(io, socket, payload);
  }

  /**
   * @returns {Array.<string>}
   */
  const _getEventNames = () => _events.map(e => e.eventName);
  
  return router;
}



