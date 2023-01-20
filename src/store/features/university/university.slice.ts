import { services } from "@/common/services/services";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { University } from "./university.interface";

type UniversityState = {
  univerties: University[] | null;
};

const initialState: UniversityState = {
  univerties: null,
};

export const universitySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setUniversities(
      state: UniversityState,
      action: PayloadAction<UniversityState["univerties"]>,
    ) {
      state.univerties = action.payload;
    },
  },
});

export const fetchUniversities = createAsyncThunk(
  "universities/get-universities",
  async (_value, thunkAPI) => {
    const response = await services.getAllUniversities();
    thunkAPI.dispatch(setUniversities(response));
  },
);

export const { setUniversities } = universitySlice.actions;

export const universityReducer = universitySlice.reducer;
