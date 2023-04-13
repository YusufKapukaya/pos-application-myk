import { Button, Form, Input, message, Modal, Table, Select } from "antd";
import React, { useEffect, useState } from "react";

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all");
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  const onFinish = (values) => {
    console.log(values);
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/update-products", {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: editingItem._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Die Waren wurde Erfolgreich aktualisiert.");
      setProducts(
        products.map((item) => {
          if (item._id === editingItem._id) {
            return values;
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Es ist gescheitert.");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Bist du sicher?")) {
      try {
        fetch(process.env.REACT_APP_SERVER_URL + "/api/products/delete-product", {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Es ist gelöscht.");
        setProducts(products.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Es ist gescheitert.");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Waren Name",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Waren Bild",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => {
        return (
          <img src={record.img} alt="" className="w-full h-20 object-cover" />
        );
      },
    },
    {
      title: "Preis",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Kategorie",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (_, record) => {
        return (
          <div>
            <Button
              type="link"
              className="pl-0"
              onClick={() => {
                setIsEditModalOpen(true);
                setEditingItem(record);
              }}
            >
              {" "}
              Aktualiesieren
            </Button>
            <Button
              type="link"
              danger
              onClick={() => deleteCategory(record._id)}
            >
              Löschen
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
    <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        scroll={{
          x: 1000,
          y: 600,
        }}
      />
      <Modal
        title="Yeni Ürün Ekle"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={editingItem}
        >
          <Form.Item
            name="title"
            label="Product Name"
            rules={[
              { required: true, message: "Hier ist Meldepflicht!!" },
            ]}
          >
            <Input placeholder="Geben sie bitte Productname ein." />
          </Form.Item>
          <Form.Item
            name="img"
            label="Waren Bild"
            rules={[
              { required: true, message: "Hier ist Meldepflicht!!" },
            ]}
          >
            <Input placeholder="Geben sie bitte Product Name ein." />
          </Form.Item>
          <Form.Item
            name="price"
            label="Preis"
            rules={[
              { required: true, message: "Hier ist Meldepflicht!!" },
            ]}
          >
            <Input placeholder="Geben sie bitte Preis ein." />
          </Form.Item>
          <Form.Item
            name="category"
            label="Kategorie Wählen"
            rules={[
              { required: true, message: "Hier ist Meldepflicht!" },
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
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
