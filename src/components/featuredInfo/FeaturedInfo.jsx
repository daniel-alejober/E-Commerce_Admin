import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; /*Redux */
import clienteAxios from "../../helpers/axios";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import "./featuredInfo.css";

export default function FeaturedInfo() {
  /*estamos usando redux para poder optener el token*/
  const token = useSelector((state) => state.user.currentUser.accessToken);
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await clienteAxios.get("orders/income", {
          headers: { token: `Bearer ${token}` },
        });
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / (res.data[0].total - 100));
      } catch (error) {
        console.log(error);
      }
    };
    getIncome();
  }, [token]);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
