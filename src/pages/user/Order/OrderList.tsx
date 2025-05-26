import OrderItem from "./OrderItem";

export default function OrderList({ items = [] }: { items: any[] }) {
  if (items.length === 0) {
    return (
      <p className="text-gray-500">Không có sản phẩm nào trong đơn hàng.</p>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <OrderItem
          key={`${item.itemId}-${index}`}
          image={item.image}
          name={item.name}
          itemType={item.itemType}
          itemId={item.itemId}
          price={item.price}
          quantity={item.quantity}
        />
      ))}
    </div>
  );
}
