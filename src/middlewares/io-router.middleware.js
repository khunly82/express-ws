import { Server, Socket } from "socket.io";

export class IoRouter {
  _events = [];
}

/**
 * @param {string} eventName 
 * @param {Server} io 
 * @param {Socket} socket 
 */
IoRouter.prototype._handle = function(eventName, io, socket, payload) {
  this._events.find(e => e.eventName === eventName)?.handler(io, socket, payload);
}

/**
 * @returns {Array.<string>}
 */
IoRouter.prototype._getEvents = function() {
  return this._events.map(e => e.eventName)
}

/**
 * @param {string} eventName 
 * @param {Array.<{(io: Server, socket: Socket, payload: any, next: () => {}) => void}>} middlewares 
 */
IoRouter.prototype.add = function(eventName, ...middlewares) {
  const event = { eventName, handler: (io, socket, payload, chain) => {
    chain = (chain ?? [...middlewares]);
    const middleware = chain.shift();
    if(middleware) {
      middleware(io, socket, payload, () => event.handler(io, socket, payload, chain));
    }
  }}
  this._events.push(event);
}

/**
 * @param {Server} io 
 * @returns {(socket: Socket, next: () => {}) => void}
 */
IoRouter.prototype.invoke = function(io) {
  io.on('connection', (socket) => {
    this._handle('connection', io, socket);
    this._getEvents().filter(route => route !== 'connection').forEach(route => {
      socket.on(route, (payload) => {
        this._handle(route, io, socket, payload);
      });
    });
  });
  return (_, next) => {
    next();
  };
}



