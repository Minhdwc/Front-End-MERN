import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import authorizedAxiosInstance from "@/ultils/authorAxios";
import OrderList from "./OrderList";
import OrderSummary from "./OrderSummary";
import AddressPicker from "../../../components/UI/AddressPicker/AddressPicker";

const fetchDataProduct = async (id: string, type: string) => {
  try {
    let url = "";
    if (type === "Pet") url = `/pet/get/d=${id}`;
    else if (type === "Accessory") url = `/accessory/get/d=${id}`;
    else url = `/food/get/d=${id}`;
    const response = await authorizedAxiosInstance.get(url);
    return response.data?.data || {};
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return {};
  }
};

export default function OrderPage() {
  const { cart } = useSelector((state: RootState) => state.cart);
  const [items, setItems] = useState<any[]>([]);
  const [address, setAddress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!cart?.item) return;
      const data = await Promise.all(
        cart.item.map(async (i) => {
          const product = await fetchDataProduct(i.itemId, i.itemType);
          return { ...i, ...product };
        })
      );
      setItems(data);
      setLoading(false);
    };
    load();
  }, [cart]);

  const totalAmount = items.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto py-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Đơn hàng</h1>
      <AddressPicker onConfirm={(data) => setAddress(data)} />
      {address && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-semibold">Địa chỉ đã chọn:</h2>
          <p>{address.display_name}</p>
        </div>
      )}
      {loading ? (
        <p className="text-gray-500">Đang tải dữ liệu đơn hàng...</p>
      ) : (
        <>
          <OrderList items={items} />
          <hr className="my-6" />
          <OrderSummary total={totalAmount} />
        </>
      )}
    </div>
  );
}
