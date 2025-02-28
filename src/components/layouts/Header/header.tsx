import { Row, Col, Typography, Button, Tooltip, Space } from "antd";
import Logo from "@/components/UI/Logo";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
const HeaderComponent = () => {
  return (
    <>
        <Row className="flex justify-center items-center">
          <Col span={8}>
            <Logo image="/logo.png" ref="/" />
          </Col>
          <Col span={8}>
            <Typography.Title level={2} style={{ color: "#ffffff" }}>
              Where Every Pet Feels at Home!
            </Typography.Title>
          </Col>
          <Col span={8}>
            <Space size="middle">
            <Tooltip title="Tìm kiếm">
              <Button
                shape="circle"
                icon={<FaSearch />}
                className="btn-header"
              ></Button>
            </Tooltip>
            <Tooltip title="Tài khoản">
              <Button
                shape="circle"
                icon={<FaRegUserCircle />}
                className="btn-header"
              ></Button>
            </Tooltip>
            </Space>
          </Col>
        </Row>
    </>
  );
};

export default HeaderComponent;
