import { Button, Modal } from "antd";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintBill = ({ isModalOpen, setIsModalOpen, customer }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Modal
      title="Rechnung Erstellen"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}
    >
      <section className="py-20 bg-black" ref={componentRef}>
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-700">LOGO</h2>
            </div>
            <div className="bill-details">
              <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Rechnung Adresse:</p>
                  <b>{customer?.customerName}</b>
                  <p>Libellenstrasse 22</p>
                  <p>Luzern 6004</p>
                  <p>Schweiz</p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Rechnung :</p>
                  Adresse
                  <p>Libellenstrasse 22</p>
                  <p>Luzern 6004</p>
                  <p>Schweiz</p>
                </div>
                <div className="text-md text-slate-500">
                  <div className="">
                    <p className="font-bold text-slate-700">Rechnung Nummer:</p>
                    <p>00{Math.floor(Math.random() * 100)}</p>
                  </div>
                  <div className="">
                    <p className="font-bold text-slate-700">Abgabe Datum:</p>
                    <p>{customer?.createdAt.substring(0, 10)}</p>
                  </div>
                </div>
                <div className="text-md text-slate-500 sm:block hidden">
                  <div>
                    <p className="font-bold text-slate-700">Bedingungen:</p>
                    <p>20 Tage</p>
                  </div>
                  <div className="">
                    <p className="font-bold text-slate-700">
                      Die geplante Abgabe Datum:
                    </p>
                    <p>2022-12-12</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th
                      scope="col"
                      className="py-3.5  text-left text-sm font-normal text-slate-700  md:pl-0 sm:table-cell hidden "
                    >
                      Bild
                    </th>
                    <th
                      colSpan={4}
                      scope="col"
                      className="py-3.5  text-left text-sm font-normal text-slate-700  md:pl-0 hidden "
                    >
                      Bild
                    </th>
                    <th
                      scope="col"
                      className=" py-3.5  text-left text-sm font-normal text-slate-700  md:pl-0 sm:table-cell hidden"
                    >
                      Titel
                    </th>
                    <th
                      colSpan={4}
                      scope="col"
                      className=" py-3.5  text-left text-sm font-normal text-slate-700  md:pl-0 sm:hidden"
                    >
                      Titel
                    </th>
                    <th
                      scope="col"
                      className="py-3.5  text-center text-sm font-normal text-slate-700  md:pl-0 sm:table-cell hidden "
                    >
                      Preis
                    </th>
                    <th
                      scope="col"
                      className="py-3.5  text-center text-sm font-normal text-slate-700  md:pl-0 sm:table-cell hidden "
                    >
                      Stück
                    </th>
                    <th
                      scope="col"
                      className="py-3.5  text-end text-sm font-normal text-slate-700  md:pl-0 sm:table-cell  "
                    >
                      Kosten
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customer?.cartItems.map((item) => (
                    <tr className="border-b border-slate-200">
                      <td className="py-4 pr-3 sm:table-cell hidden">
                        <img
                          src={item.img}
                          alt=""
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="py-4 sm:table-cell hidden">
                        <div className="flex flex-col">
                          <span className="font-medium ">{item.title}</span>
                          <span className="text-xs sm:hidden inline-block">
                            Ein Stück {item.price}$
                          </span>
                        </div>
                      </td>
                      <td className="py-4 sm:hidden" colSpan={4}>
                        <div className="flex flex-col">
                          <span className="font-medium ">{item.title}</span>
                          <span className="text-xs sm:hidden inline-block">
                            Ein Stück {item.price}$
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-center  sm:table-cell hidden">
                        <span>{item.price.toFixed(2)}$</span>
                      </td>
                      <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                        <span>{item.quantity}</span>
                      </td>
                      <td className="py-4 text-end ">
                        <span>{(item.price * item.quantity).toFixed(2)}$</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">Kosten</span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan={4}
                    >
                      <p className="font-normal text-slate-700">Kosten</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.subTotal}$
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">MwS.</span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <p className="font-normal text-slate-700">MwS.</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-red-600">
                        {customer?.tax}$
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Insgesamt
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <p className="font-normal text-slate-700">Insgesamt</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.totalAmount}$
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-9">
                <div className="border-t pt-9 border-slate-200">
                  <p className="text-sm font-light text-slate-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam illo nobis sapiente, tempore, reiciendis magnam
                    corporis dolorum a quaerat eveniet quisquam corrupti est eum
                    placeat excepturi laudantium modi, porro adipisci?
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large" onClick={handlePrint}>
          Drucken
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBill;
