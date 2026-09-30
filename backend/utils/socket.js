import { Server } from 'socket.io';

let io;

export function initIo(httpServer) {
  io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_ORIGIN, credentials: true },
  });

  io.on('connection', (socket) => {
    console.log(`socket ${socket.id} connected`);

    socket.on('disconnect', (reason) => {
      console.log(`socket ${socket.id} disconnected due to ${reason}`);
    });
  });
}

export function getIo() {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
}

function notifyIncidentCreated(incident) {
  const ioServer = getIo();
  ioServer.emit('incident:created', incident);
}

function notifyIncidentUpdated(incident) {
  const ioServer = getIo();
  ioServer.emit('incident:updated', incident);
}

function notifyIncidentDeleted(incidentId) {
  const ioServer = getIo();
  ioServer.emit('incident:deleted', { id: incidentId });
}

export const emitHelpers = {
  notifyIncidentCreated,
  notifyIncidentUpdated,
  notifyIncidentDeleted,
};
