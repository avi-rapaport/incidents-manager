import { useEffect } from 'react';
import { useIncidentStore } from '../store/incidentsStore';
import { socket } from '../services/socket';

export function useSocketListeners() {
  const addIncident = useIncidentStore((state) => state.addIncident);
  const updateIncident = useIncidentStore((state) => state.updateIncident);
  const deleteIncident = useIncidentStore((state) => state.deleteIncident);

  useEffect(() => {
    socket.on('incident:created', (newIncident) => {
      addIncident(newIncident);
    });

    socket.on('incident:updated', (updatedIncident) => {
      updateIncident(updatedIncident);
    });

    socket.on('incident:deleted', ({ id }) => {
      deleteIncident(id);
    });

    return () => {
      socket.off('incident:created');
      socket.off('incident:updated');
      socket.off('incident:deleted');
    };
  }, [addIncident, updateIncident, deleteIncident]);
}
