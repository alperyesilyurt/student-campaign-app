import { services } from "@/common/services/services";
import { RegisterFormSchemaType } from "@/components/forms/auth/RegisterForm";
import { LoginFormSchemaType } from "@/modules/Auth/Login";
import { RootState } from "@/store/store";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AuthState, FormStepValues, StudentFormSteps } from "./auth.interface";

const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
  accesToken: undefined,
  registerSteps: {
    studentSteps: {
      basicInfo: null,
      personalInfo: null,
      educationInfo: null,
      verifyEmail: null,
    },
  },
  isRegistering: false,
  registeredAt: undefined,
  step: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: AuthState, action: PayloadAction<AuthState["user"]>) {
      state.user = action.payload;
    },
    setToken(state: AuthState, action: PayloadAction<AuthState["accesToken"]>) {
      console.log("action.payload", action.payload);
      state.accesToken = action.payload;
    },
    setStudentStepValues(
      state,
      action: PayloadAction<{ step: StudentFormSteps; values: FormStepValues }>,
    ) {
      const { step, values } = action.payload;
      state.registerSteps.studentSteps[step] = values;
    },
    setStep(state, action: PayloadAction<"+" | "-">) {
      state.step += action.payload === "+" ? 1 : -1;
    },
    setRegistirationDate(state, action: PayloadAction<Date>) {
      state.registeredAt = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.isRegistering = false;
    });
    builder.addCase(registerThunk.pending, (state, action) => {
      state.isRegistering = true;
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.isRegistering = false;
    });
  },
});

export const selectRegisteredUserEmailDomain = createSelector(
  (state: RootState) => state.auth,
  (auth: AuthState) =>
    auth.registerSteps.studentSteps.basicInfo?.email.split("@")[1],
);

export const selectStepAndIsRegistering = createSelector(
  (state: RootState) => state.auth,
  (auth: AuthState) => {
    return { isRegistering: auth.isRegistering, step: auth.step };
  },
);

export const selectRegistirationDate = createSelector(
  (state: RootState) => state.auth,
  (auth: AuthState) => auth.registeredAt,
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (value: RegisterFormSchemaType, thunkAPI) => {
    thunkAPI.dispatch(
      setStudentStepValues({ step: "basicInfo", values: value }),
    );
    try {
      const response = await services.register(value);
      if (response.status === 201) {
        thunkAPI.dispatch(
          loginThunk({ email: value.email, password: value.password }),
        );
        thunkAPI.dispatch(setStep("+"));
        thunkAPI.dispatch(setRegistirationDate(new Date()));
      }
    } catch (error) {}
  },
);
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (value: LoginFormSchemaType, thunkAPI) => {
    try {
      const response = await services.login(value);
      console.log("response", response?.data);
      thunkAPI.dispatch(setToken(response?.data.accessToken));
    } catch (error) {}
    // thunkAPI.dispatch(setToken());
  },
);

export const verifyEmail = createAsyncThunk(
  "auth/verify-email",
  async (value: { emailVerifyToken: string }, thunkAPI) => {
    const currentUser = thunkAPI.getState() as { auth: AuthState };
    if (!currentUser) {
      return;
    }
    try {
      const response = await services.verifyEmail({
        email: currentUser.auth.user?.email!,
        verificationCode: value.emailVerifyToken,
      });
      console.log("response", response);
      console.log("🚀 ~ file: auth.slice.ts:129 ~ response", response);
      thunkAPI.dispatch(setUser(response));
    } catch (error) {
      console.log("error", error);
    }
  },
);

export const {
  setUser,
  setStudentStepValues,
  setToken,
  setStep,
  setRegistirationDate,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
