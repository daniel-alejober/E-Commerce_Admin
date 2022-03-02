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
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
    msg: "",
  },
  /*
   *No siempre vamos a necesitar el action ya que no vamos a enviar nada a otros archivos,
   *vamos a traer todos los productos */
  reducers: {
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.msg = action.payload;
    },
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },

    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      /*
       *el splice sirve para cambiar el contenido de un array ya sea eliminando o agregando,
       *pero debemos encontrar el indice del elemento que queremos eleminar con findIndex()
       */
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload.id),
        1
      );
    },
    deleteProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.msg = action.payload;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductFailure,
  deleteProductSuccess,
  deleteProductStart,
} = userSlice.actions;
export default userSlice.reducer;
