import React, { useState, useEffect } from "react";
import clienteAxios from "../../helpers/axios";
import { useSelector } from "react-redux";
import WidgetOrders from "./WidgetOrders";
import "./widgetlg.css";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  /*estamos usando redux */
  const token = useSelector((state) => state.user.currentUser.accessToken);
  console.log(orders);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await clienteAxios.get("orders", {
          headers: { token: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [token]);
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {orders.map((order) => (
            <WidgetOrders key={order._id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
