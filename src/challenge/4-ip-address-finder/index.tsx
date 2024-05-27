import { useCallback, useEffect, useState } from 'react';
import {
  APIProvider,
  Map,
  Marker,
  MapCameraChangedEvent,
  MapCameraProps,
} from '@vis.gl/react-google-maps';
import GoogleMap from './googleMap';

type mapData = {
  ip: string;
  longitude: number;
  latitude: number;
  city: string;
  state: string;
  country: string;
  company: string;
};

const IpAddressFinder = () => {
  const [mapData, setMapData] = useState<mapData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://ip-api.com/json/');
      const data = await res.json();
      const filterData: mapData = {
        ip: data.query,
        longitude: data.lon,
        latitude: data.lat,
        city: data.city,
        state: data.regionName,
        country: data.country,
        company: data.isp,
      };
      setMapData(filterData);
    };
    fetchData();
  }, []);

  return (
    <div className='w-screen h-screen flex flex-col justify-center  items-center mx-1/12'>
      <h1 className='font-pacifico text-3xl mb-10'>IP Address Finder</h1>
      {mapData ? (
        <div className='md:min-w-[800px] mx-auto md:flex md:gap-10 text-lg text-center md:text-left'>
          <div className=' mb-10 flex flex-col gap-4'>
            <p className='font-semibold -mb-2'>What is my IPv4 Address</p>
            <p className='text-2xl text-blue-600 font-bold'>{mapData.ip}</p>
            <p className='font-semibold -mb-2'>Approximate location</p>
            <p className=' text-blue-400'>{`${mapData.city} , ${mapData.state}, ${mapData.country}`}</p>
            <p className='font-semibold -mb-2'>
              Internet Service Provider (IPS)
            </p>
            <p className=' text-blue-400'>{mapData.company}</p>
          </div>
          <div className='h-[300px] w-[350px] md:h-full md:w-5/6 mx-auto'>
            <GoogleMap
              longitude={mapData.longitude}
              latitude={mapData.latitude}
            />
          </div>
        </div>
      ) : (
        <h1>Map Data is loading.</h1>
      )}
    </div>
  );
};

export default IpAddressFinder;
