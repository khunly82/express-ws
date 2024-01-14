export const IoIsLoggedGuard = (socket, next) => {
  if(!socket.user) {
    next(new Error('Connection failed'));
    return;
  }
  next();
}