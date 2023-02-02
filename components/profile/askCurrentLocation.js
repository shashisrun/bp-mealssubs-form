import React from 'react'
import { GoogleMap, Marker, Autocomplete, LoadScript } from '@react-google-maps/api';
import Title from '../title';
import { addNamedDocument } from '../../config/firebase';
import { useAuth } from "../../contexts/authContext";

function AskCurrentLocation(){
  const [center, setCenter] = React.useState({ lat: 20.593683, lng: 78.962883 });
  const [address, setAddress] = React.useState();
  const [autocomplete, setAutocomplete] = React.useState();
  const [house, setHouse] = React.useState('');
  const [defaultAddress, setDefaultAddress] = React.useState(true);
  const [alert, setAlert] = React.useState();
  const [map, setMap] = React.useState(null);
  const { user, setUser } = useAuth();

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
          <div className='my-2'>
            <Title text={'Enter your Address'} />
          </div>
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
              className='input input-border input-primary w-full autocomplete-address'
            />
        </Autocomplete>
        </div>
        <div className='my-2 text-center'>
          or drag the marker at your location
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
        <div className="my-10">
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                <Title text={"Your house number/flat number/floor number "} />
              </span>
            </label>
          <input type="text" placeholder="Enter your house number / flat number / floor number" className="input input-bordered w-full bg-base-100 text-primary"
              value={house}
              onChange={(event) => setHouse(event.target.value)}
            />
          </div>
      </div>
      
        <div className="my-10">
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                <Title text={"Is this your default address"} />
              </span>
            </label>
              <input type="checkbox" class="toggle toggle-success" checked={defaultAddress} onChange={() => {setDefaultAddress(!defaultAddress)}} />
          </div>
        </div>
          {alert ? 
            <div className='my-2'>
              <div class={`alert alert-${alert.type} shadow-lg`}>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{alert.message}</span>
                </div>
              </div>
            </div>
          : <></>}
        <div className="my-10">
        <button className='btn btn-primary' onClick={async () => {
          if (!address) {
            setAlert({
              type: 'error',
              message: 'Please enter or select your street address'
            })
            return
          }
          if (!house) {
            setAlert({
              type: 'error',
              message: 'Please enter your house number'
            })
            return
          }
          const data = {
            street: address,
            lat: center.lat,
            lng: center.lng,
            default: defaultAddress
          }
          try {
            const locations = user.profile.locations ? user.profile.locations : [];
            if (defaultAddress) {
              for (let index = 0; index < locations.length; index++) {
                if (locations[index].default) {
                  locations[index].default = false;
                }
              }
            }
            locations.push(data)
            await addNamedDocument('users', {
              locations: [...locations]
            }, user.uid)
            const profile = await getDocument('users', user.uid);
            setAlert({
              type: 'success',
              message: 'Your address is saved'
            })
            setUser({ ...user, profile: profile });
          } catch (error) {
            console.log(error);
          }
          }}>
            Add Address
          </button>
      </div>
      </>
    )
}

export default React.memo(AskCurrentLocation);