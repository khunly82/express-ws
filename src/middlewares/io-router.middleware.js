import { Server, Socket } from "socket.io";

export const IoRouter = () => {
  const router = (io) => {
    io.on('connection', (socket) => {
      router._handle('connection', io, socket);
    });
    return (socket, next) => {
      router._getEvents().filter(route => route !== 'connection').forEach(route => {
        socket.on(route, (payload) => {
          router._handle(route, io, socket, payload);
        });
      });
      next();
    };
  }

  router._events = [];

  /**
   * @param {string} eventName 
   * @param {Server} io 
   * @param {Socket} socket 
   */
  router._handle = (eventName, io, socket, payload) => {
    router._events.find(e => e.eventName === eventName)?.handler(io, socket, payload);
  }

  /**
   * @returns {Array.<string>}
   */
  router._getEvents = () => {
    return router._events.map(e => e.eventName)
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
    router._events.push(event);
  }
  return router;
}



