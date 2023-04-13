import { Button, Card, Form, Input, message, Modal, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/cartSlice";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (res.status === 200) {
        message.success("Die Rechnung wurde ergestellt.");
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      message.danger("Es scheiterte.");
      console.log(error);
    }
  };
  return (
    <Modal
      title="Rechnung Erstellen"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout={"vertical"} onFinish={onFinish}>
        <Form.Item
          label="Kundenname"
          name={"customerName"}
          rules={[{ required: true, message: "Kundenname ist obligatorisch" }]}
        >
          <Input placeholder="Bitte geben Sie den Kundenname ein" />
        </Form.Item>
        <Form.Item
          label="Kontakt Daten"
          name={"customerPhoneNumber"}
          rules={[{ required: true, message: "Hier ist pflichtfeld" }]}
        >
          <Input
            placeholder="Bitte geben Sie die Kontakt Daten ein"
            maxLength={11}
          />
        </Form.Item>

        <Form.Item
          label="Zahl Methode"
          name={"paymentMode"}
          rules={[{ required: true, message: "Hier ist pflichtfeld" }]}
        >
          <Select placeholder="Bitte wählen Sie eine Zahlmethode">
            <Select.Option value="Bar">Bar</Select.Option>
            <Select.Option value="Kredit Karte">Kredit Karte</Select.Option>
          </Select>
        </Form.Item>
        <Card>
          <div className="flex justify-between">
            <span>Zwischen Summe</span>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}$</span>
          </div>
          <div className="flex justify-between my-2">
            <span>Steuer Insgesamt</span>
            <span className="text-red-600">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              $
            </span>
          </div>
          <div className="flex justify-between">
            <b>Insgesamt</b>
            <b>
              {" "}
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              $
            </b>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-4 "
              type="primary"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
              disabled={cart.cartItems.length===0}
            >
              Bestellen
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;
