import { ConnectionHub } from "../hubs/connection.hub.js";
import { MessageHub } from "../hubs/message.hub.js";
import { IoRouter } from "../middlewares/io-router.middleware.js";

export const ioRoutes = new IoRouter();

ioRoutes.add('connection', ConnectionHub.connect);
ioRoutes.add('disconnect', ConnectionHub.disconnect);
ioRoutes.add('sendMessage', MessageHub.send);
ioRoutes.add('notifyIsTyping', MessageHub.notifyIsTyping);