import { useState } from 'react';
import { useCreateIncident } from '../hooks/useIncidentsApi';
import { useIncidentStore } from '../store/incidentsStore';
import type { Category } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateIncidentModal({ isOpen, onClose }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('other');
  const [lat, setLat] = useState<number>(32.0853);
  const [lng, setLng] = useState<number>(34.7818);

  const { mutate: createIncident, isPending } = useCreateIncident();
  const addIncidentToStore = useIncidentStore((state) => state.addIncident);

  if (!isOpen) return null;

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    createIncident(
      {
        title,
        description,
        category,
        location: { lat: Number(lat), lng: Number(lng) },
      },
      {
        onSuccess: (result) => {
          if (result && result.data) {
            addIncidentToStore(result.data);
          }
          onClose();
          setTitle('');
          setDescription('');
        },
      }
    );
  };

  return (
    <div
      style={{
        border: '2px solid black',
        padding: '20px',
        background: 'white',
      }}
    >
      <h3>Create new incident</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

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

        <div>
          <label>Latitude:</label>
          <input
            type="number"
            step="any"
            value={lat}
            onChange={(e) => setLat(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label>Longitude:</label>
          <input
            type="number"
            step="any"
            value={lng}
            onChange={(e) => setLng(Number(e.target.value))}
            required
          />
        </div>

        <button type="button" onClick={onClose}>
          cancell
        </button>

        <button type="submit" disabled={isPending}>
          {isPending ? 'sending...' : 'create incident'}
        </button>
      </form>
    </div>
  );
}
