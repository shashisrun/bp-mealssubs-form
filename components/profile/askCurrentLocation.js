import React from 'react'
import { GoogleMap, Marker, Autocomplete, LoadScript } from '@react-google-maps/api';

function AskCurrentLocation(){
  const [center, setCenter] = React.useState({ lat: 20.593683, lng: 78.962883 });
  const [address, setAddress] = React.useState();
  const [autocomplete, setAutocomplete] = React.useState();
  const [map, setMap] = React.useState(null);

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

   const onLoadAutocomplete =  (autocomplete) => {
    console.log('autocomplete: ', autocomplete)

    this.autocomplete = autocomplete
  }


    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

  return (
    <>
      <LoadScript googleMapsApiKey={mapkey} libraries={["places"]}>
        <div className='container my-10'>
          <Autocomplete
            onPlaceChanged={() => {
              console.log('autocomplete', autocomplete)
              if (autocomplete) {
                const selectedAdress = autocomplete.getPlace()
                setAddress(selectedAdress.formatted_address);
                setCenter({ lat: selectedAdress.geometry.location.lat(), lng: selectedAdress.geometry.location.lng() })
              }
            }}
            onLoad={(autocompleteinsatance) => {
              setAutocomplete(autocompleteinsatance);
            }}
          >
            <input
              type="text"
              placeholder={address ? address : "Enter your address"}
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
              const geocoder = new window.google.maps.Geocoder();
              geocoder.geocode({
                location: center
              }, (results, status) => {
                if (status == google.maps.GeocoderStatus.OK) {
                  setAddress(results[0].formatted_address)
                } else {
                  alert('Geocode was not successful for the following reason: ' + status);
                }
              });
            }} />
          </GoogleMap>
        </div>

      </LoadScript>
      </>
    )
}

export default React.memo(AskCurrentLocation);