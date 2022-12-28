import { configureStore } from "@reduxjs/toolkit";
import { companyReducers, authReducer } from "./features";

export const store = configureStore({
  reducer: {
    company: companyReducers,
    auth: authReducer,
    // Add the generated reducer as a specific top-level slice
    // [counterApi.reducerPath]: counterApi.reducer,
  },
  // Add the generated middleware to the store
  // middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware().concat(counterApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;