import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import {
  companyReducers,
  authReducer,
  universityReducer,
  campaignReducer,
  setToken,
} from "@/store/features";
import { addTokenToHeader } from "@/common/services/HttpClient";

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    company: companyReducers,
    auth: authReducer,
    university: universityReducer,
    campaign: campaignReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

listenerMiddleware.startListening({
  actionCreator: setToken,
  effect: async (action, listenerApi) => {
    const token = action.payload!;
    if (token) {
      console.log("🚀 ~ file: store.ts:29 ~ effect: ~ token:", token);
      addTokenToHeader(token);
    }
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
