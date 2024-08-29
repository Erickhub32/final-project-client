import { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

function CustomMap() {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDAh0CUsaYUSqj9zca2Y8fRz4S5ZqSrDdk"
  })

  const [map, setMap] = useState(null)

  const onLoad = (map) => console.log('Aquí haz lo que necesites tras la carga del mapa')
  const onUnmount = () => setMap(null)

  return isLoaded && (
    <GoogleMap
      mapContainerStyle={{ height: '150px', width: '400px' }}
      zoom={12}
      onLoad={onLoad}
      center={{ lat: 40.39392488839124, lng: -3.6988567261496446 }}
      onUnmount={onUnmount}

    >
      <Marker position={{ lat: 40.39392488839124, lng: -3.6988567261496446 }} />


    </GoogleMap>
  )
}

export default CustomMap