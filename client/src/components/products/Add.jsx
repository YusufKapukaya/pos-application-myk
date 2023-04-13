import { Button, Form, Input, message, Modal } from "antd";
import React from "react";
import { Select } from "antd";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setCategories,
  products,
  setProducts,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Die Ware wurde erfolgreich hinzugefügt.");
      form.resetFields();
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Eine neue Kategorie erstellen"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Eine neue Kategorie erstellen"
          rules={[
            { required: true, message: "Kategorie Bereich ist obligatorisch!" },
          ]}
        >
          <Input placeholder="Geben Sie bitten einen Product Name ein" />
        </Form.Item>
        <Form.Item
          name="img"
          label="Waren Bild"
          rules={[
            { required: true, message: "Warenbild Bereich ist obligatorisch!" },
          ]}
        >
          <Input placeholder="Geben Sie bitten ein Productbild ein" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Waren Kosten"
          rules={[
            { required: true, message: "Waren Preis ist obligatorisch!" },
          ]}
        >
          <Input placeholder="Geben Sie bitten die Productpreis ein" />
        </Form.Item>
        <Form.Item
          name="category"
          label="Kategorie Wählen"
          rules={[
            { required: true, message: "Dieser Bereich ist meldepflicht!" },
          ]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
