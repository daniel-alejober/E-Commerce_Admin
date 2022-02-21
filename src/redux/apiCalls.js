import { clienteAxiosPublic } from "../helpers/axios";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

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
    const res = await clienteAxiosPublic.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.msg));
  }
};
