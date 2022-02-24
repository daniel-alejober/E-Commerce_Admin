import React from "react";

const WidgetOrders = ({ order }) => {
  const Button = ({ type }) => {
    return <button className={type}>{type}</button>;
  };
  return (
    <tr className="widgetLgTr">
      <td className="widgetLgUser">
        <img
          src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
          className="widgetLgImg"
        />
        <span className="widgetLgName">{order.userId}</span>
      </td>
      <td className="widgetLgDate">{order.createdAt.substring(-1, 10)}</td>
      <td className="widgetLgAmount">${order.amount}</td>
      <td className="widgetLgStatus">
        <Button type={order.status} />
      </td>
    </tr>
  );
};

export default WidgetOrders;
