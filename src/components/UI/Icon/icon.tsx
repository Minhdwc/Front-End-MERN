import { useState } from "react";
import { Drawer } from "antd";

export default function CustomIcon({
  icon,
  content,
}: {
  icon: React.ReactNode;
  content: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="cursor-pointer font-black text-xl p-2 hover:bg-gray-200 rounded-full text-black"
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
        <div className="text-black">{content}</div>
      </Drawer>
    </div>
  );
}
