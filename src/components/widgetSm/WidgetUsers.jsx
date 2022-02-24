import React from "react";
import { Visibility } from "@material-ui/icons";

const WidgetUsers = ({ user }) => {
  return (
    <li className="widgetSmListItem">
      <div className="widgetSmUser">
        <img
          src={
            user.img ||
            "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
          }
          alt={user.username}
          className="widgetSmImg"
        />
        <span className="widgetSmUsername">{user.username}</span>
      </div>
      <button className="widgetSmButton">
        <Visibility className="widgetSmIcon" />
        Display
      </button>
    </li>
  );
};

export default WidgetUsers;
