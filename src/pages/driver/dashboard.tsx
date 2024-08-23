import GoogleMapReact, { Position } from "google-map-react";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/header";

interface IDriverProps {
    lat?: number;
    lng?: number;
    $hover?: any;
}
const Driver: React.FC<IDriverProps> = () => <div className="text-lg">🚖</div>;

export const Dashboard = () => {
    const [driverCoords, setDriverCoords] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
    const [map, setMap] = useState<any>();
    const [maps, setMaps] = useState<any>();

    const onSuccess = (position: GeolocationPosition) => {
        setDriverCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
    };
    const onError = (positionError: GeolocationPositionError) => {
        console.log(positionError);
    };

    const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
        map.setCenter(new maps.LatLng(driverCoords.lat, driverCoords.lng));
        setMap(map);
        setMaps(maps);
    };

    useEffect(() => {
        navigator.geolocation.watchPosition(onSuccess, onError, {
            enableHighAccuracy: true,
        });
    }, []);

    useEffect(() => {
        if (map && maps) {
            map.setCenter(new maps.LatLng(driverCoords.lat, driverCoords.lng));
        }
    }, [driverCoords]);

    return (
        <div>
            <Header transparent={false} />
            <div className="overflow-hidden" style={{ width: window.innerWidth, height: "95vh" }}>
                <GoogleMapReact
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={onApiLoaded}
                    bootstrapURLKeys={{ key: "AIzaSyBJXRLDI8l08C56s7Turf09FJoMJ7kPFQs" }}
                    center={driverCoords ? driverCoords: {lat: 0, lng:0}}
                    defaultZoom={15}
                    draggable={false}
                >
                    <Driver lat={driverCoords.lat} lng={driverCoords.lng} />
                </GoogleMapReact>
            </div>
        </div>
    );
};
