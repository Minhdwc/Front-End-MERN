import { useState } from "react";
import { Drawer } from "antd";
const CustomIcon = ({
  icon,
  content,
  number,
}: {
  icon: React.ReactNode;
  content: React.ReactNode;
  number?: number;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {number !== undefined && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full z-10">
          {number}
        </span>
      )}
      <div
        className="cursor-pointer font-black text-xl p-2 hover:bg-gray-200 rounded-full text-black relative"
        onClick={() => setOpen(!open)}
      >
        {icon}
      </div>

      <Drawer
        title="Menu"
        placement="right"
        closable={true}
        onClose={() => setOpen(false)}
        open={open}
      >
        <div className="text-black mt-10">{content}</div>
      </Drawer>
    </div>
  );
};
export default CustomIcon;
