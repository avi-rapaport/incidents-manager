import { create } from 'zustand';
import { type IncidentsStore } from '../types';

export const useIncidentStore = create<IncidentsStore>((set) => ({
  incidents: [],
  setIncidents: (incidents) => set({ incidents }),
  addIncident: (newIncident) =>
    set((state) => {
      const exists = state.incidents.some((inc) => inc.id === newIncident.id);
      if (exists) return state;
      return { incidents: [...state.incidents, newIncident] };
    }),
  updateIncident: (updatedIncident) =>
    set((state) => ({
      incidents: state.incidents.map((inc) =>
        inc.id === updatedIncident.id ? updatedIncident : inc
      ),
    })),
  deleteIncident: (incidentId) =>
    set((state) => ({
      incidents: state.incidents.filter((inc) => inc.id !== incidentId),
    })),
}));
