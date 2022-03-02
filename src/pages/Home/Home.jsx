import React, { useState, useMemo, useEffect } from "react";
import clienteAxios from "../../helpers/axios";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useSelector } from "react-redux"; /*Redux */
import "./home.css";

export default function Home() {
  /*estamos usando redux para poder optener el token*/
  const token = useSelector((state) => state.user.currentUser.accessToken);
  /*
   *Le pasaremos datos que vienen direscto de la db */
  const [userStats, setUserStats] = useState([]);
  /*
   *Vamos a usar useMeno esta es la sintaxis useMemo(() => first, [second])*/

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await clienteAxios.get("/users/stats", {
          headers: { token: `Bearer ${token}` },
        });
        /*ya que lo re nos regresa es un array podemos iterarlos */
        res.data.map((item) =>
          /*prev son todos los valores anteriores del array,
          y tomara el nombre del MONTHS[Agu] con el -1 y el otro es el total*/
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [token, MONTHS]);

  return (
    <div className="home">
      <div className="homeData">
        <FeaturedInfo />
        {userStats.length > 0 ? (
          <Chart
            data={userStats}
            title="User Analytics"
            grid
            dataKey="Active User"
          />
        ) : null}
      </div>
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
