import React from "react";
import GoogleMapReact from 'google-map-react';
import { Icon } from '@chakra-ui/react'
import { FcLowPriority } from "react-icons/fc";

const Pin = ({ text }) => <div><Icon as={FcLowPriority} w={6} h={6}/></div>;

export default function SimpleMap({center, zoom}){
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '160px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyB_OaJaTr0Bpgr6vWFsFwxRljZ1ZPhdpxY" }}
        center={center}
        zoom={zoom}
      >
        <Pin
          lat={center.lat}
          lng={center.lng}
        />
      </GoogleMapReact>
    </div>
  );
}