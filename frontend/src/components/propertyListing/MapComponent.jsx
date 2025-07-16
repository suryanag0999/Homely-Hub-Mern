import React, { useEffect, useState } from "react";
import { MapContainer,TileLayer,Marker,Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"

const MapComponent = ({address}) => {
const city = `${address.city}, ${address.state}, ${address.pincode}`;
const [coordinates,setCoordinates] = useState([]);
const [loading,setLoading] =useState(false);
const[error,setError] = useState(null);



useEffect(()=>{
  let isMounted = true;
  setLoading(true);
  const fetchCoordinates = async()=>{
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
      const data = await response.json();
      if(isMounted){
        if(data.length>0){
          const {lat,lon} = data[0];
          setCoordinates([lat,lon]);
        }else{
          setCoordinates([]);
        }
      }
    } catch (error) {
      if(isMounted){
        console.error("error fetching geocoding data:",error)
        setError("Error fetching coordiantes");
      }
    }finally{
      setLoading(false);
    }
  };
  fetchCoordinates();
  return () =>{
    isMounted = false
  };
},[city]);
return <div>
  {loading && (
    <p>loading...</p>
)}
{error && <p>{error}</p>}
{coordinates.length>0 && (
  <MapContainer center={coordinates} zoom={coordinates.length>0 ? 13 :1} scrollWheelZoom={true} style={{height:"322px", width: "100%" }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {coordinates.length > 0 && (
      <Marker position={coordinates}>
      <Popup>
        {city}
      </Popup>
    </Marker>
    )}
  </MapContainer>
)}
</div>;
};

export default MapComponent;
