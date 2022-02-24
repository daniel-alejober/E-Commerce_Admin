import axios from "axios";

const clienteAxios = axios.create();

clienteAxios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

export default clienteAxios;

/*
 *Estamos transformando el objeto de local storage a json para asi poder acceder a ellos
 *como si fuera un objeto hasta llegar al token*/
//const objectUser = JSON.parse(localStorage.getItem("persist:root"));
// if (Object.keys(objectUser)) {
//   const currentData = JSON.parse(objectUser.currentUser);
//   console.log(currentData);
// }
// console.log(currentData);
// const token = currentData.accessToken;

// export const clienteAxiosAuth = axios.create({
//   baseURL: process.env.REACT_APP_BACKEND_URL,
//   headers: { token: `Bearer ${token}` },
// });
