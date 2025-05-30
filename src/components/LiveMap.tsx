// components/LiveMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

type User = {
  _id: string;
  name: string;
  image: string;
  location: {
    lat: number;
    lng: number;
  };
  message: string;
};

interface LiveMapProps {
  users: User[];
}

const LiveMap: React.FunctionComponent<LiveMapProps> = ({ users }) => {
  const nelloreCenter: [number, number] = [14.4426, 79.9865];

  return (
    <MapContainer
      center={nelloreCenter}
      zoom={15}
      style={{ height: "60vh", width: "100%", marginTop: "3rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup chunkedLoading>
        {users.map((user) => (
          <Marker
            key={user._id}
            position={[user.location.lat, user.location.lng]}
          >
            <Popup>
              <div className="text-center flex flex-row">
                <div>
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="text-sm font-medium">{user.name}</p>
                </div>
                <div>{user.message}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default LiveMap;
