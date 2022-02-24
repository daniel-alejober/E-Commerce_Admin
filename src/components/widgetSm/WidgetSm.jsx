import React, { useState, useEffect } from "react";
import clienteAxios from "../../helpers/axios";
import WidgetUsers from "./WidgetUsers";
import { useSelector } from "react-redux";
import "./widgetsm.css";

export default function WidgetSm() {
  /*estamos usando redux */
  const token = useSelector((state) => state.user.currentUser.accessToken);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await clienteAxios.get("users/?new=true", {
          headers: { token: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [token]);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <WidgetUsers key={user._id} user={user} />
        ))}
      </ul>
    </div>
  );
}
