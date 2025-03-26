import { Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuComponent() {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();

  const handleClick = (e: any) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      className="font-bold border-none"
    >
      <Menu.Item key="/" style={{ color: "#ff5722" }}>
        Home
      </Menu.Item>

      <Menu.SubMenu
        key="pet"
        title={
          <span>
            Pet <DownOutlined />
          </span>
        }
        popupClassName="!mt-0 !translate-y-0 min-w-max shadow-lg rounded-lg"
      >
        <Menu.Item key="/pets/dogs">Dogs</Menu.Item>
        <Menu.Item key="/pets/cats">Cats</Menu.Item>
        <Menu.Item key="/pets/birds">Birds</Menu.Item>
        <Menu.Item key="/pets/fish">Fish</Menu.Item>
        <Menu.Item key="/pets/all">All</Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu
        key="product"
        title={
          <span>
            Product <DownOutlined />
          </span>
        }
        popupClassName="!mt-0 !translate-y-0 min-w-max shadow-lg rounded-lg"
      >
        <Menu.Item key="/products/food">Pet Food</Menu.Item>
        <Menu.Item key="/products/accessories">Accessories</Menu.Item>
        <Menu.Item key="/products/health">Health & Care</Menu.Item>
        <Menu.Item key="/products/toys">Toys</Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu
        key="deal"
        title={
          <span>
            Deal <DownOutlined />
          </span>
        }
        popupClassName="!mt-0 !translate-y-0 min-w-max shadow-lg rounded-lg"
      >
        <Menu.Item key="/deals/discounts">Discounts</Menu.Item>
        <Menu.Item key="/deals/combo">Combo Offers</Menu.Item>
        <Menu.Item key="/deals/new-arrival">New Arrivals</Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key="/appointment" style={{ color: "#009688" }}>
        Appointment
      </Menu.Item>
    </Menu>
  );
}
