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

  geocode(RequestType.LATLNG, lat + "," + lng)
    .then(({ results }) => {
      const address = results[0].formatted_address;
      setAddressName(address);
    })
    .catch(console.error);

  return {
    addressName,
  };
};

export default useGeoCode;
