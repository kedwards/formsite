import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import localforage from "localforage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: localforage,
  stateReconciler: autoMergeLevel2,
};

const middleware = [thunk];

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
