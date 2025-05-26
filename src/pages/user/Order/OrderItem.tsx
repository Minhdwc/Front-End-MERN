type Props = {
  image: string;
  name: string;
  itemType: string;
  itemId: string;
  price: number;
  quantity: number;
};

export default function OrderItem({
  image,
  name,
  itemType,
  price,
  quantity,
}: Props) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition duration-300">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 object-cover rounded-md shadow-sm"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mb-1">
          Loại: <b>{itemType}</b>
        </p>
        <p className="text-sm text-gray-700">
          Số lượng: <b>{quantity}</b>
        </p>
        <p className="text-sm text-gray-700">
          Đơn giá: <b>{price}</b>
        </p>
      </div>
    </div>
  );
}
