import React from 'react'
import { GoogleMap, Marker, Autocomplete, LoadScript } from '@react-google-maps/api';

function AskCurrentLocation(){
  const [center, setCenter] = React.useState({lat: 20.593683, lng: 78.962883});
  const [map, setMap] = React.useState(null)

  const containerStyle = {
    width: '100%',
    height: '500px'
  };
  const mapkey = "AIzaSyBRB_v3kerIoYi7bS6d9kfuNqL-VTRrr1E"


    const onLoad = React.useCallback(function callback(map) {
      navigator?.geolocation.getCurrentPosition(
        ({coords}) => {
          const newCenter = {lat: coords.latitude, lng: coords.longitude}
          setCenter(newCenter)
          
          const bounds = new window.google.maps.LatLngBounds(newCenter);
          map.fitBounds(bounds);
          setMap(map)
        }
      )
    }, [])
  
  React.useEffect(() => {

  })

    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

  return (
    <>
      <LoadScript googleMapsApiKey={mapkey} libraries={["places"]}>
        <div className='container my-10'>
          <Autocomplete
            onPlaceChanged={(event) => {
              console.log(event)
            }}
          >
            <input
              type="text"
              placeholder="Enter your address"
              className='input input-border input-primary w-full'
            />
        </Autocomplete>
        </div>
        <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker position={center} draggable={true} onDragEnd={(evt) => {
              const newpos = { lat: evt.latLng.lat(), lng: evt.latLng.lng() }
              setCenter(newpos)
            }} />
          </GoogleMap>
        </div>

      </LoadScript>
      </>
    )
}

export default React.memo(AskCurrentLocation);