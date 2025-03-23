import { Menu, Dropdown } from "antd";
import SubMenu from "./SubMenu";
import { DownOutlined } from "@ant-design/icons";

export default function MenuComponents() {
  return (
    <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
      <Menu.Item key="home" style={{ fontWeight: "bold", color: "#ff5722" }}>
        Home
      </Menu.Item>

      <Dropdown
        overlay={<SubMenu items={["Shop 1", "Shop 2", "Shop 3"]} />}
        trigger={["hover"]}
      >
        <Menu.Item key="shop">
          Shop <DownOutlined />
        </Menu.Item>
      </Dropdown>

      <Dropdown
        overlay={
          <SubMenu items={["Fiction", "Non-fiction", "Science", "History"]} />
        }
        trigger={["hover"]}
      >
        <Menu.Item key="categories">
          Categories <DownOutlined />
        </Menu.Item>
      </Dropdown>

      <Dropdown
        overlay={
          <SubMenu items={["New Arrivals", "Best Sellers", "Discounts"]} />
        }
        trigger={["hover"]}
      >
        <Menu.Item key="products">
          Products <DownOutlined />
        </Menu.Item>
      </Dropdown>

      <Dropdown
        overlay={<SubMenu items={["Flash Deals", "Daily Offers", "Coupons"]} />}
        trigger={["hover"]}
      >
        <Menu.Item key="top-deals">
          Top deals <DownOutlined />
        </Menu.Item>
      </Dropdown>

      <Dropdown
        overlay={<SubMenu items={["Typography", "Icons", "Buttons"]} />}
        trigger={["hover"]}
      >
        <Menu.Item key="elements">
          Elements <DownOutlined />
        </Menu.Item>
      </Dropdown>
    </Menu>
  );
}
