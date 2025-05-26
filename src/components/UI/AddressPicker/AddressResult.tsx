interface AddressResultProps {
  results: any[];
  onSelect: (item: any) => void;
}

export default function AddressResult({
  results,
  onSelect,
}: AddressResultProps) {
  if (results.length === 0) return null;

  return (
    <ul className="mt-2 border rounded p-2 bg-gray-50 max-h-48 overflow-y-auto shadow-sm">
      {results.map((item, idx) => (
        <li
          key={idx}
          className="cursor-pointer hover:bg-blue-50 p-2 border-b last:border-b-0"
          onClick={() => onSelect(item)}
        >
          {item.display_name}
        </li>
      ))}
    </ul>
  );
}
