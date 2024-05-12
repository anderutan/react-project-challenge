import { useCallback, useState } from 'react';
import {
  APIProvider,
  Map,
  Marker,
  MapCameraChangedEvent,
  MapCameraProps,
} from '@vis.gl/react-google-maps';

const GoogleMap = ({ latitude, longitude }) => {
  const INITIAL_CAMERA = {
    center: { lat: latitude, lng: longitude },
    zoom: 12,
  };

  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);
  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) =>
    setCameraProps(ev.detail)
  );

  return (
    <APIProvider apiKey='AIzaSyAJ-GEOXXA_dauIwX-PiaH3b9m__dbsrf8'>
      <Map {...cameraProps} onCameraChanged={handleCameraChange}>
        <Marker position={INITIAL_CAMERA.center} />
      </Map>
    </APIProvider>
  );
};

export default GoogleMap;
