export type Category = 'fire' | 'flood' | 'accident' | 'medical' | 'other';

export type Status = 'open' | 'in-progress' | 'closed';

export interface CreateIncidentBody {
  title: string;
  description: string;
  category: Category;
  location: { lat: number; lng: number };
}

export type UpdateIncidentBody = Partial<CreateIncidentBody>;

export interface Incident {
  id: string;
  title: string;
  description: string;
  category: Category;
  location: { lat: number; lng: number };
  status: Status;
  createdBy: string;
  createdAt: string;
  updateAt: string;
}

export interface IncidentsStore {
  incidents: Incident[];
  setIncidents: (incidents: Incident[]) => void;
  addIncident: (incident: Incident) => void;
  updateIncident: (updatedIncident: Incident) => void;
  deleteIncident: (incidentId: string) => void;
}
