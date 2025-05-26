import { useEffect, useRef, useState } from "react";
import authorizedAxiosInstance from "@/ultils/authorAxios";
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

  const fetchResults = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await authorizedAxiosInstance.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: query,
            format: "json",
            addressdetails: 1,
            limit: 5,
          },
        }
      );
      setResults(res.data);
    } catch (err) {
      console.error("Search failed:", err);
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
      <AddressModal
        selected={selected}
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={confirmAddress}
      />
    </div>
  );
}
