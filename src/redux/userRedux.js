import { createSlice } from "@reduxjs/toolkit";

/*
 * tenemos que instalar @reduxjs/toolkit y react-redux,
 * importamos createSlice() y despues lo vamos a inicializar,
 * dandole un nombre y un estado inicial,
 * despues en el reducer va a ir las funciones que queremos que se hagan con el estado inicial
 ! dentro de accion se encuentra el payload que es la data que le pasemos, cuando ya lo
 ! estemos usando en otros archivos, le pasaremos objetos con nombre y datos como,
 !correo contraseña
 */

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    msg: "",
  },
  /*
   *No siempre vamos a necesitar el action ya que no vamos a enviar nada a otros archivos */
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.msg = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
