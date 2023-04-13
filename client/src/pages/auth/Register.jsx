import { Button, Carousel, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if (res.status === 200) {
        message.success("Anmeldung ist erfolgreich.");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      message.error("Es ist gescheitert.");
      console.log(error);
    }
  };

  
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Benutzer Name"
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Benutzername ist obligatorisch!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail ist obligatorisch!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Passwort"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Passwort ist obligatorisch!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Passwort wiederholen"
              name={"passwortAgain"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Passwort wiederholen ist obligatorisch!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Die Passworten müssen gleich sein!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Registrieren
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Haben Sie bereit ein Konto?&nbsp;{" "}
            <Link to="/login" className="text-blue-600 ">
              Sie können jetzt anmelden{" "}
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay>
                <AuthCarousel
                  img="/images/responsive.svg"
                  title="Responsive"
                  desc="Mit allen Geraten ist es angepasst"
                />
                <AuthCarousel
                  img="/images/statistic.svg"
                  title="statistik"
                  desc="Die statistischen Angaben"
                />
                <AuthCarousel
                  img="/images/customer.svg"
                  title="Kunden Zufridenheit"
                  desc="Die Bewertungen"
                />
                <AuthCarousel
                  img="/images/admin.svg"
                  title="Verwaltung"
                  desc="in einer Seite alles verwalten"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
