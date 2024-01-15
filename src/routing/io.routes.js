import { ConnectionHub } from "../hubs/connection.hub.js";
import { MessageHub } from "../hubs/message.hub.js";
import { IoRouter } from "../middlewares/io-router.middleware.js";

export const ioRoutes = IoRouter();

ioRoutes.add('connection', (io, socket, payload, next) => {
    console.log('je passe bien par ce middleware !!')
    next();
}, ConnectionHub.connect);
ioRoutes.add('disconnect', ConnectionHub.disconnect);
ioRoutes.add('sendMessage', MessageHub.send);
ioRoutes.add('notifyIsTyping', MessageHub.notifyIsTyping);