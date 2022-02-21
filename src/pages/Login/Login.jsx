import React, { useState } from "react";

const Login = () => {
  const [dataUser, setDataUser] = useState({
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState(false);

  const handleChange = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataUser.name === "" || dataUser.password === "") {
      setErrors(true);
      return;
    }
    setErrors(false);
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
