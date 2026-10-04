import type React from 'react';
import { useUpdateIncident } from '../hooks/useIncidentsApi';
import { useIncidentStore } from '../store/incidentsStore';
import type { Category, Incident, Status } from '../types';
import { useState } from 'react';

interface UpdateProps {
  incident: Incident;
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateIncidentModal({
  incident,
  isOpen,
  onClose,
}: UpdateProps) {
  const [title, setTitle] = useState(incident.title);
  const [description, setDescription] = useState(incident.description);
  const [category, setCategory] = useState<Category>(incident.category);
  const [lat, setLat] = useState<number>(incident.location.lat);
  const [lng, setLng] = useState<number>(incident.location.lng);
  const [status, setStatus] = useState<Status>(incident.status);

  const { mutate: updateIncident, isPending } = useUpdateIncident(incident.id);
  const updateIncidentStore = useIncidentStore((state) => state.updateIncident);

  if (!isOpen || !incident) return null;

  const handleUpdate = (e: React.SubmitEvent) => {
    e.preventDefault();

    const toUpdate = {
      title,
      description,
      category,
      location: { lat: Number(lat), lng: Number(lng) },
      status,
    };

    updateIncident(toUpdate, {
      onSuccess: (result) => {
        if (result && result.data) {
          updateIncidentStore(result.data);
          onClose();
        }
      },
    });
  };

  return (
    <div
      style={{
        border: '2px solid black',
        padding: '20px',
        background: 'white',
      }}
    >
      <h3>edit incident</h3>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>
          category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            <option value="fire">Fire</option>
            <option value="flood">Flood</option>
            <option value="accident">accident</option>
            <option value="medical">Medical</option>
            <option value="other">Other</option>
          </select>
        </label>

        <input
          placeholder="Latitude"
          type="number"
          value={lat}
          onChange={(e) => setLat(Number(e.target.value))}
        />

        <input
          placeholder="Longitude"
          type="number"
          value={lng}
          onChange={(e) => setLng(Number(e.target.value))}
        />
        <label>
          status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            <option value="open">Open</option>
            <option value="in-progress">In progress</option>
            <option value="close">Close</option>
          </select>
        </label>

        <button type="button" onClick={onClose}>
          cancell
        </button>

        <button type="submit" disabled={isPending}>
          {isPending ? 'sending...' : 'update incident'}
        </button>
      </form>
    </div>
  );
}
