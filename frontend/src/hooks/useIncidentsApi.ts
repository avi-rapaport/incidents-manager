import { useMutation, useQuery } from '@tanstack/react-query';
import type { CreateIncidentBody, UpdateIncidentBody } from '../types';

export function useGetIncidents(category?: string) {
  return useQuery({
    queryKey: ['incidents', category],
    queryFn: async () => {
      const url = category
        ? `http://localhost:3000/incidents?category=${category}`
        : 'http://localhost:3000/incidents';

      const res = await fetch(url, {
        credentials: 'include',
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      return result;
    },
  });
}

export function useGetIncidentById(incidentId: string) {
  return useQuery({
    queryKey: ['incident', incidentId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/incidents/${incidentId}`, {
        credentials: 'include',
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      return result;
    },
  });
}

export function useCreateIncident() {
  return useMutation({
    mutationFn: async (body: CreateIncidentBody) => {
      const res = await fetch('http://localhost:3000/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      return result;
    },
  });
}

export function useUpdateIncident(incidentId: string) {
  return useMutation({
    mutationFn: async (body: UpdateIncidentBody) => {
      const res = await fetch(`http://localhost:3000/incidents/${incidentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      return result;
    },
  });
}

export function useDeleteIncident(incidentId: string) {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:3000/incidents/${incidentId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      return result;
    },
  });
}
