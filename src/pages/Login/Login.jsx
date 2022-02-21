import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [dataUser, setDataUser] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState(false);
  /*
   *Vamos a importar el dispatch para poder pasarselo al redux como payload*/
  const dispatch = useDispatch();

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
  };
  return (
    <form onSubmit={handleSubmit}>
      {errors && <p>All inputs are required</p>}
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
