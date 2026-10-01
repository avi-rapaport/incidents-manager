export type Category = 'fire' | 'flood' | 'accident' | 'medical' | 'other';

export interface CreateIncidentBody {
  title: string;
  description: string;
  category: Category;
  location: { lat: number; lng: number };
}

export type UpdateIncidentBody = Partial<CreateIncidentBody>;
