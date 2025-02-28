import { Col, Row, Input } from "antd";
import Img from '../../../assets/logo.png'
import Logo from "~/components/UI/Logo";

const Header = () => {
  return (
    <Row gutter={[20, 20]}>
      <Col span={6}>
        <Logo image={Img} ref="/"  />
      </Col>
        <Col span={6}>
            <Input type="text"/>
        </Col>
    </Row>
  );
};

export default Header;
