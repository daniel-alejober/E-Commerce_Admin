/*
*Vamos a crear el statdo global, e importamos el archivo donde se encuentran los tados iniciales
* y al igual que useContext debemos envolver toda la app con el Reduce para que sea global
! lo vamos a hacer en el archivo de index.js
*/

/*
*Asi lo vamos a usar, le agregamos dentro del Provider los datos que querramos que sean persistentes
*import { Provider } from "react-redux";
*import { PersistGate } from "redux-persist/integration/react";
*import { store, persistor } from "./redux/store";
*<React.StrictMode>
    <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <App />
    </Provider>
*</React.StrictMode>
 */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartRedux from "./cartRedux";
import userRedux from "./userRedux";

/*
 *Vamos a hacer la sesion persistente para que cuando reiniciemos no se pierdan los datos,
 * debemos instalar redux-persist
 */
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
/*
 *combinamos los reducers, asi tanto la sesion como los articulos que esten en el
 *carrito se van a quedar*/
const rootReducer = combineReducers({ user: userRedux, cart: cartRedux });

/*
 *Vamos a indicar que valores queremos que sean persistentes
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/*
 *Aqui estamos exportando los reducer de cada respectivo archivo para que sean colocados globalmente
  !le vamos a agregar persistedReducer a user para que los datos sean persistentes y no se borren al recargar la pagina
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
