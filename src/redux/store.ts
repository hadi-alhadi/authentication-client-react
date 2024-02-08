import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth.slice";
import { userReducer } from "./slices/user.slice";
import { generalReducer } from "./slices/general.slice";
import { authAPI } from "../services/auth.service";

export const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    generalReducer,

    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authAPI.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
