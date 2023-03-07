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
import { sanitizeStudentInfo } from "@/common/utils/utils";
import { saveTokenToStorage } from "@/common/utils/storage";

const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
  accesToken: undefined,
  isStudentRegisterSuccess: false,
  authToast: null,
  registerSteps: {
    studentSteps: {
      basicInfo: null,
      personalInfo: null,
      educationInfo: null,
      verifyEmail: null,
    },
    student: {
      basicInfo: null,
      personalInfo: null,
      educationInfo: null,
      verifyEmail: null,
    },
  },
  isRegistering: false,
  isSubmittingStudent: false,
  registeredAt: undefined,
  step: 0,
};

// create a selector for the slice that chekcs if user is logged in
export const selectIsLoggedIn = createSelector(
  (state: RootState) => state.auth,
  (auth: AuthState) => auth.user && auth.accesToken,
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: AuthState, action: PayloadAction<AuthState["user"]>) {
      state.user = action.payload;
    },
    setToken(state: AuthState, action: PayloadAction<AuthState["accesToken"]>) {
      console.log(
        "🚀 ~ file: auth.slice.ts:48 ~ setToken ~ setToken:",
        action.payload,
      );
      state.accesToken = action.payload;
    },
    setIsStudentRegisterSuccess(
      state: AuthState,
      action: PayloadAction<AuthState["isStudentRegisterSuccess"]>,
    ) {
      state.isStudentRegisterSuccess = action.payload;
    },
    setAuthToast(
      state: AuthState,
      action: PayloadAction<AuthState["authToast"]>,
    ) {
      state.authToast = action.payload;
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
    builder.addCase(verifyEmail.fulfilled, (state, action) => {
      state.isSubmittingStudent = false;
    });
    builder.addCase(verifyEmail.pending, (state, action) => {
      state.isSubmittingStudent = true;
    });
    builder.addCase(verifyEmail.rejected, (state, action) => {
      state.isSubmittingStudent = false;
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
      thunkAPI.dispatch(setToken(response?.data.accessToken));
      saveTokenToStorage(response.data.accessToken);
      const currentUser = await services.getCurrentUser();
      thunkAPI.dispatch(setUser(currentUser));
    } catch (error) {}
  },
);

export const getCurrentUserThunk = createAsyncThunk(
  "auth/getMe",
  async (_value, thunkAPI) => {
    const currentStore = thunkAPI.getState() as { auth: AuthState };

    if (!currentStore.auth.accesToken) {
      return;
    }
    try {
      const currentUser = await services.getCurrentUser();
      thunkAPI.dispatch(setUser(currentUser));
    } catch (error) {}
  },
);

export const verifyEmail = createAsyncThunk(
  "auth/verify-email",
  async (value: { emailVerifyToken: string }, thunkAPI) => {
    const currentStore = thunkAPI.getState() as { auth: AuthState };
    if (!currentStore) {
      return;
    }
    try {
      const response = await services.verifyEmail({
        email: currentStore.auth.user?.email!,
        verificationCode: value.emailVerifyToken,
      });
      thunkAPI.dispatch(setUser(response.data));
      const studentUpdatePayload = sanitizeStudentInfo(
        currentStore.auth.registerSteps.studentSteps,
      );
      const updatedResponse = await services.updateStudentInfo(
        studentUpdatePayload,
        currentStore.auth.accesToken || "",
      );
      if (updatedResponse.status === 200) {
        thunkAPI.dispatch(setIsStudentRegisterSuccess(true));
      }
    } catch (error) {
      thunkAPI.dispatch(
        setAuthToast({
          title: "Hata",
          description: "Geçersiz kod",
          status: "error",
        }),
      );
    }
  },
);

export const {
  setUser,
  setStudentStepValues,
  setToken,
  setStep,
  setRegistirationDate,
  setIsStudentRegisterSuccess,
  setAuthToast,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
