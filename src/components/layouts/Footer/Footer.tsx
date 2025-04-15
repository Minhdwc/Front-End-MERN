import React from "react";
import { Layout, Row, Col, Typography, Space } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text } = Typography;

const FooterComponents = () => {
  return (
    <Footer className="bg-gray-900 text-white py-10 px-4 sm:px-12">
      <Row gutter={[32, 16]} justify="center">
        {/* Company Information */}
        <Col
          xs={24}
          sm={12}
          md={6}
          className="flex flex-col items-center sm:items-start text-center sm:text-left"
        >
          <Title level={4} className="text-white">
            Company
          </Title>
          <Space direction="vertical">
            <Text className="text-white">About Us</Text>
            <Text className="text-white">Contact Us</Text>
            <Text className="text-white">Privacy Policy</Text>
            <Text className="text-white">Terms & Conditions</Text>
          </Space>
        </Col>

        {/* Customer Support */}
        <Col
          xs={24}
          sm={12}
          md={6}
          className="flex flex-col items-center sm:items-start text-center sm:text-left"
        >
          <Title level={4} className="text-white">
            Customer Support
          </Title>
          <Space direction="vertical">
            <Text className="text-white">Help Center</Text>
            <Text className="text-white">Shopping Guide</Text>
            <Text className="text-white">Return & Refund Policy</Text>
            <Text className="text-white">Shipping Policy</Text>
          </Space>
        </Col>

        {/* Account & Orders */}
        <Col
          xs={24}
          sm={12}
          md={6}
          className="flex flex-col items-center sm:items-start text-center sm:text-left"
        >
          <Title level={4} className="text-white">
            Account & Orders
          </Title>
          <Space direction="vertical">
            <Text className="text-white">Login / Register</Text>
            <Text className="text-white">Track Order</Text>
            <Text className="text-white">Order History</Text>
            <Text className="text-white">Manage Account</Text>
          </Space>
        </Col>

        {/* Social Media */}
        <Col
          xs={24}
          sm={12}
          md={6}
          className="flex flex-col items-center sm:items-start text-center sm:text-left"
        >
          <Title level={4} className="text-white">
            Follow Us
          </Title>
          <Space size="large">
            <FacebookOutlined className="text-white text-2xl" />
            <InstagramOutlined className="text-white text-2xl" />
            <TwitterOutlined className="text-white text-2xl" />
            <YoutubeOutlined className="text-white text-2xl" />
          </Space>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponents;
