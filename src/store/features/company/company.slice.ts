import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyState } from "./company.interface";

const initialState: CompanyState = {
  isLoggedIn: false,
  company: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany(
      state: CompanyState,
      action: PayloadAction<CompanyState["company"]>,
    ) {
      state.company = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;

export const companyReducers = companySlice.reducer;
