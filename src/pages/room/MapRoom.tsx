import GoogleMapReact from "google-map-react";
import { MapCenter } from "../../Interface/Position";
import { HomeMapIcon } from "../../utilities/IconSvg";
export default function MapRoom({ positionRoom }: { positionRoom: string }) {
  const center: MapCenter = {
    lat: +positionRoom.split("/")[0],
    lng: +positionRoom.split("/")[1],
  };

  return (
    <div className="h-screen">
      <GoogleMapReact defaultCenter={center} defaultZoom={12}>
        <HomeMapIcon lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  );
}
