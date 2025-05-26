import { Modal } from "antd";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

const RecenterMap = ({ lat, lon }: { lat: number; lon: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], 16);
  }, [lat, lon, map]);
  return null;
};

export default function AddressModal({
  selected,
  open,
  onCancel,
  onConfirm,
}: {
  selected: any;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  console.log(selected);
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Xác nhận địa chỉ"
      cancelText="Hủy"
      width={650}
      afterOpenChange={(visible) => {
        if (visible) {
          setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
        }
      }}
    >
      <p className="mb-3 text-base font-semibold text-gray-700">
        {selected?.display_name}
      </p>
      {selected && (
        <div className="rounded overflow-hidden border shadow">
          <MapContainer
            center={[selected.lat, selected.lon]}
            zoom={16}
            style={{ height: "300px", width: "100%" }}
            scrollWheelZoom={false}
          >
            <RecenterMap lat={selected.lat} lon={selected.lon} />
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[selected.lat, selected.lon]}>
              <Popup>Địa chỉ bạn đã chọn</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </Modal>
  );
}
