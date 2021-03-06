import clienteAxios from "../helpers/axios";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductFailure,
  deleteProductSuccess,
  deleteProductStart,
  updateProductFailure,
  updateProductSuccess,
  updateProductStart,
  addProductFailure,
  addProductSuccess,
  addProductStart,
} from "./productRedux";

/*
*Esta funcion nos va ayudar para poder dar acceso a un usuario previamente logeado,
*le vamos a pasar por parametro el dispatch y los datos del usuario,
* primero le pasaremos la funcion de loginStart() que se encarga  de ir poner el estado de isFetching en true, que indica que estamos buscandolo
? despues de que haga la busqueda y tengamos una respuesta se lo pasaremos a la funcion loginSuccess(), que se encarga
? de poner el isFetching= false y guarda los datos del usuario en el payload
! Si no encuentra los datos isFetching = false ya hubo una respuesta pero erronea y pone error=true
 */
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await clienteAxios.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.msg));
  }
};

/*
 *Aqui sera para poder traer los productos de la db y hacerlos globalmente */
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await clienteAxios.get("products");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure(error.response.data.msg));
  }
};

/*
 * Borrar un producto*/
export const deleteProduct = async (id, dispatch, token) => {
  dispatch(deleteProductStart());
  try {
    const res = await clienteAxios.delete(`products/${id}`, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(deleteProductSuccess(res.data));
  } catch (error) {
    dispatch(deleteProductFailure(error.response.data.msg));
  }
};
/*
 * Actualizar un producto*/
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // const res = await clienteAxios.put(`products/${id}`, {
    //   headers: { token: `Bearer ${token}` },
    // });
    dispatch(updateProductSuccess({ id, product }));
  } catch (error) {
    dispatch(updateProductFailure(error.response.data.msg));
  }
};
/*
 * Agregar un producto*/
export const addProduct = async (product, dispatch, token) => {
  dispatch(addProductStart());
  try {
    const res = await clienteAxios.post(`products/`, product, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailure(error.response.data.msg));
  }
};
