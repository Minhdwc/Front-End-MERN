import { Form, Input, DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { useState } from "react";
import type { Rule } from "antd/es/form";
import dayjs from "dayjs";
import { message } from "antd";

interface FormInputProps {
  label: string;
  name: string;
  rules?: Rule[];
  type?: "text" | "password";
  placeholder?: string;
  dependencies?: string[];
}

const FormInput = ({
  label,
  name,
  rules,
  type = "text",
  placeholder,
  dependencies,
  ...props
}: FormInputProps) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    dependencies={dependencies}
    className="mb-4"
  >
    {type === "password" ? (
      <Input.Password
        placeholder={placeholder}
        className="rounded-md border border-yellow-300 px-3 py-2"
      />
    ) : (
      <Input
        placeholder={placeholder}
        className="rounded-md border border-yellow-300 px-3 py-2"
        {...props}
      />
    )}
  </Form.Item>
);

export default function DetailRegister() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  return (
    <div className="space-y-4">
      <FormInput
        label="Họ Tên"
        name="name"
        rules={[{ required: false, message: "Vui lòng nhập tên của bạn!" }]}
        placeholder="Họ tên người dùng"
      />

      <Form.Item
        label="Ngày sinh"
        name="dateOfBirth"
        rules={[{ required: false, message: "Vui lòng nhập ngày sinh!" }]}
        className="mb-4"
      >
        <DatePicker
          className="w-full rounded-md"
          disabledDate={(current) => {
            return current && current > dayjs().endOf("day");
          }}
        />
      </Form.Item>

      <FormInput
        label="Email"
        name="email"
        rules={[
          { required: false, message: "Vui lòng nhập email!" },
          { type: "email", message: "Email không hợp lệ!" },
        ]}
        placeholder="you@example.com"
      />

      <FormInput
        label="Mật khẩu"
        name="password"
        type="password"
        rules={[
          { required: false, message: "Vui lòng nhập mật khẩu!" },
          { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
        ]}
        placeholder="Nhập mật khẩu của bạn"
      />

      <FormInput
        label="Xác nhận mật khẩu"
        name="confirmPassword"
        type="password"
        dependencies={["password"]}
        rules={[
          { required: false, message: "Vui lòng xác nhận mật khẩu!" },
          ({ getFieldValue }) => ({
            validator(_: unknown, value: string) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Mật khẩu không khớp!"));
            },
          }),
        ]}
        placeholder="Nhập lại mật khẩu của bạn"
      />

      <Form.Item
        label="Ảnh đại diện"
        name="image"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: false, message: "Vui lòng tải lên ảnh đại diện!" }]}
        className="mb-0"
      >
        <Upload
          beforeUpload={(file) => {
            const isImage = file.type.startsWith("image/");
            if (!isImage) {
              message.error("Bạn chỉ có thể tải lên file ảnh!");
              return Upload.LIST_IGNORE;
            }
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
              message.error("Ảnh phải nhỏ hơn 5MB!");
              return Upload.LIST_IGNORE;
            }
            return false;
          }}
          fileList={fileList}
          onChange={handleChange}
          listType="picture"
          maxCount={1}
          accept="image/*"
          className="rounded-md"
        >
          <button
            type="button"
            className="rounded-md bg-yellow-300 text-yellow-900 font-semibold px-4 py-2 hover:bg-yellow-400 transition"
          >
            <UploadOutlined className="inline mr-2" />
            Tải ảnh lên
          </button>
        </Upload>
      </Form.Item>
    </div>
  );
}
