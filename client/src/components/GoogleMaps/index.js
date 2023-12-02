import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import "./App.css";

const App = ({ selectedLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  
  if (loadError) return "Erro ao carregar o mapa";
  if (!isLoaded) return "Carregando mapa...";

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={selectedLocation}
          zoom={14}
          options = {{mapId: ' c9f05d2432216984 '}} 
        >
          {selectedLocation && (<Marker position={selectedLocation}/>)}
        </GoogleMap>
      )}
    </div>
  );
};

export default App;