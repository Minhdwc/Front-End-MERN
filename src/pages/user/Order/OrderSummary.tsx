import { Button as AntButton } from "antd";
import CancelIcon from "@mui/icons-material/Cancel";
import PaymentsIcon from "@mui/icons-material/Payments";

type Props = {
  total: number;
};
const handlePayment = () => {};

export default function OrderSummary({ total }: Props) {
  return (
    <div className="flex justify-between items-center mt-6 p-4 bg-white border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-blue-600">
        Tổng cộng: <span className="text-2xl">{total.toLocaleString()}₫</span>
      </h2>

      <div className="flex gap-3">
        <AntButton
          type="primary"
          size="large"
          className="bg-blue-600 hover:!bg-blue-700 !text-white px-6 rounded-md"
          icon={<PaymentsIcon />}
        >
          Thanh toán
        </AntButton>

        <AntButton
          danger
          size="large"
          className="bg-red-500 hover:bg-red-700 hover:text-white  rounded-md "
          icon={<CancelIcon />}
        >
          Hủy
        </AntButton>
      </div>
    </div>
  );
}
