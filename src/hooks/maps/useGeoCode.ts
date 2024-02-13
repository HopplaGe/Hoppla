"use client";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
import { useState } from "react";
import {useLocale} from "next-intl";

type UseGeoCodeType = {
  address?: string;
  lat?: number;
  lng?: number;
  locale: string;
};
const useGeoCode = ({ address, lat, lng }: UseGeoCodeType) => {

  const locale = useLocale();

  setKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string);
  setLanguage(locale);
  
  const [addressName, setAddressName] = useState("");

  const latLng = lat && lng ? lat + "," + lng : "41.709048311523986,44.80436404340821";

  geocode(RequestType.LATLNG, latLng as string)
    .then(({ results }) => {
      try{
        const address = results[0].formatted_address;
      setAddressName(address);
      } catch (e) {
        console.error(e);
      }
    })
    .catch(console.error);

  return {
    addressName,
  };
};

export default useGeoCode;
