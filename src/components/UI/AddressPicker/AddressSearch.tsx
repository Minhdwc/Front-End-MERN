import { Spin } from "antd";

interface AddressSearchProps {
  search: string;
  onChange: (value: string) => void;
  onManualSearch: () => void;
  loading: boolean;
}

export default function AddressSearch({
  search,
  onChange,
  onManualSearch,
  loading,
}: AddressSearchProps) {
  return (
    <div className="mb-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Địa chỉ giao hàng
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nhập địa chỉ"
          className="flex-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-200"
          value={search}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
        <button
          onClick={onManualSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Tìm
        </button>
      </div>
      {loading && (
        <div className="mt-2 text-blue-600 text-sm">
          <Spin size="small" /> Đang tìm kiếm...
        </div>
      )}
    </div>
  );
}
