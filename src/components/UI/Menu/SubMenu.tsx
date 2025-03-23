import { Menu } from "antd";

interface SubMenuProps {
  items: string[];
}

const SubMenu = (props: SubMenuProps) => {
  return (
    <Menu>
      {props.items.map((item, index) => (
        <Menu.Item key={index}>{item}</Menu.Item>
      ))}
    </Menu>
  );
};

export default SubMenu;
