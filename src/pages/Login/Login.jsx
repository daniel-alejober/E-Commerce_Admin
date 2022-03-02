import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useSelector } from "react-redux";
import "./login.css";

const Login = () => {
  const [dataUser, setDataUser] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState(false);
  /*
   *Vamos a importar el dispatch para poder pasarselo al redux como payload*/
  const dispatch = useDispatch();

  /*estamos usando redux */
  const userAdmin = useSelector((state) => state.user.currentUser);

  let admin = false;
  if (userAdmin !== null) {
    admin = userAdmin.isAdmin;
  }

  let navigate = useNavigate();

  const handleChange = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataUser.username === "" || dataUser.password === "") {
      setErrors(true);
      return;
    }
    setErrors(false);
    login(dispatch, dataUser);

    if (admin) {
      navigate("/home");
    }
  };
  return (
    <div className="containerLogin">
      <div className="containerform">
        <p>Login</p>
        <form onSubmit={handleSubmit} className="formLogin">
          {errors && <p className="error">All inputs are required</p>}
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <button className="buttonLogin" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
