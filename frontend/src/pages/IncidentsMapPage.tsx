import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useDeleteIncident, useGetIncidents } from '../hooks/useIncidentsApi';
import { useIncidentStore } from '../store/incidentsStore';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { useSocketListeners } from '../hooks/useSocketListeners';
import { CreateIncidentModal } from '../components/CreateIncidentModal';
import type { Incident } from '../types';
import { UpdateIncidentModal } from '../components/UpdateIncidentModal';

interface PopupProps {
  incident: Incident;
  onEditClick: (incident: Incident) => void;
}

function PopupContent({ incident, onEditClick }: PopupProps) {
  const { mutate: deleteIncident } = useDeleteIncident(incident.id);
  const removeStoreIncident = useIncidentStore((state) => state.deleteIncident);

  const handleDelete = () => {
    deleteIncident(undefined, {
      onSuccess: () => {
        removeStoreIncident(incident.id);
      },
    });
  };

  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      <button
        onClick={() => onEditClick(incident)}
        style={{
          background: '#ffc107',
          color: '#000',
          border: 'none',
          padding: '5px 8px',
          borderRadius: '4px',
          cursor: 'pointer',
          flex: 1,
          fontWeight: 'bold',
        }}
      >
        edit
      </button>

      <button
        onClick={handleDelete}
        style={{
          background: '#ff4d4f',
          color: 'white',
          border: 'none',
          padding: '5px 8px',
          borderRadius: '4px',
          cursor: 'pointer',
          flex: 1,
        }}
      >
        delete
      </button>
    </div>
  );
}

const IncidentsMapPage = () => {
  useSocketListeners();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedForEdit, setSelectedForEdit] = useState<Incident | null>(null);

  const incidents = useIncidentStore((state) => state.incidents);
  const setIncidents = useIncidentStore((state) => state.setIncidents);

  const { data, isPending, isError, error } = useGetIncidents();

  useEffect(() => {
    if (data && data.success) {
      setIncidents(data.data);
    }
  }, [data, setIncidents]);

  if (isPending) return <h1>Loading incidents data...</h1>;
  if (isError) return <h1>Error: {error.message}</h1>;

  const defaultCenter: [number, number] = [32.0853, 34.7818];

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <button
        onClick={() => setIsCreateOpen(true)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          background: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        }}
      >
        new report +
      </button>

      <CreateIncidentModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      {selectedForEdit && (
        <UpdateIncidentModal
          key={selectedForEdit?.id || 'closed'}
          incident={selectedForEdit}
          isOpen={Boolean(selectedForEdit)}
          onClose={() => setSelectedForEdit(null)}
        />
      )}

      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            position={[incident.location.lat, incident.location.lng]}
          >
            <Popup>
              <div style={{ minWidth: '150px' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{incident.title}</h3>
                <p style={{ margin: '0 0 5px 0' }}>{incident.description}</p>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  <span>
                    category: <strong>{incident.category}</strong>
                  </span>
                  <br />
                  <span>
                    status: <strong>{incident.status}</strong>
                  </span>
                </div>
              </div>

              <PopupContent
                incident={incident}
                onEditClick={(incident) => setSelectedForEdit(incident)}
              />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default IncidentsMapPage;
