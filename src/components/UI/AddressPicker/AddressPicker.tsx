import { useEffect, useRef, useState } from "react";
import { searchAddress } from "@/api/openStreetMaps";
import AddressSearch from "./AddressSearch";
import AddressResult from "./AddressResult";
import AddressModal from "./AddressModal";

export default function AddressPicker({
  onConfirm,
}: {
  onConfirm: (data: any) => void;
}) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchResults = async (address: string) => {
    if (!address.trim()) return;
    setLoading(true);
    try {
      const data = await searchAddress(address, { limit: 5 });
      setResults(data);
    } catch (err) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (search.trim()) {
      debounceRef.current = setTimeout(() => {
        fetchResults(search);
      }, 1000);
    } else {
      setResults([]);
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  const handleManualSearch = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    fetchResults(search);
  };

  const handleSelect = (place: any) => {
    setSelected(place);
    setOpen(true);
  };

  const confirmAddress = () => {
    onConfirm(selected);
    setOpen(false);
    setSearch("");
    setResults([]);
  };

  return (
    <div className="mb-6">
      <AddressSearch
        search={search}
        onChange={setSearch}
        onManualSearch={handleManualSearch}
        loading={loading}
      />
      <AddressResult results={results} onSelect={handleSelect} />
      {open && (
        <AddressModal
          selected={selected}
          open={open}
          onCancel={() => setOpen(false)}
          onConfirm={confirmAddress}
        />
      )}
    </div>
  );
}
