import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useGetIncidents } from '../hooks/useIncidentsApi';
import { useIncidentStore } from '../store/incidentsStore';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

const IncidentsMapPage = () => {
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
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default IncidentsMapPage;
