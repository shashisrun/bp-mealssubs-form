import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function AskCurrentLocation(){
  const [center, setCenter] = React.useState({lat: 20.593683, lng: 78.962883});
  const containerStyle = {
    width: '500px',
    height: '500px'
  };

  const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyBRB_v3kerIoYi7bS6d9kfuNqL-VTRrr1E"
    })



    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
      navigator?.geolocation.getCurrentPosition(
        ({coords}) => {
          let newCenter;
          console.log(coords)
          console.log(coords.latitude, coords.longitude)
          newCenter = {lat: coords.latitude, lng: coords.longitude}
          setCenter(newCenter)
          console.log(newCenter)
          
          const bounds = new window.google.maps.LatLngBounds(newCenter);
          map.fitBounds(bounds);
          setMap(map)
        }
      );
      // google.maps.event.addListener(map, "bounds_changed", () => {
      //   console.log(map.getBounds());
      //   this.setState({ bounds: map.getBounds() });
      // });


    }, [])

    // onMapLoad = map => {
    //   navigator?.geolocation.getCurrentPosition(
    //     ({ coords: { latitude: lat, longitude: lng } }) => {
    //       const pos = { lat, lng };
    //       this.setState({ currentLocation: pos });
    //     }
    //   );
    //   google.maps.event.addListener(map, "bounds_changed", () => {
    //     console.log(map.getBounds());
    //     this.setState({ bounds: map.getBounds() });
    //   });
    // };

    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={center} draggable={true} onPositionChanged={(event) => {
            console.log(event)
            console.log("dragend")
          }} />
        </GoogleMap>
    ) : <></>
}

export default React.memo(AskCurrentLocation);