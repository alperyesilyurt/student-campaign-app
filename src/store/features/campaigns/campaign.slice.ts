import { services } from "@/common/services/services";
import { RootState } from "@/store/store";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CampaignState } from "./campaign.interface";

const initialState: CampaignState = {
  categories: [],
};

export const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setCategories(
      state: CampaignState,
      action: PayloadAction<CampaignState["categories"]>,
    ) {
      state.categories = action.payload;
    },
  },
});

export const selectCategories = createSelector(
  (state: RootState) => state.campaign,
  (campaign: CampaignState) => campaign.categories,
);

export const getCategoriesThunk = createAsyncThunk(
  "categories/get-categories",
  async (_, thunkAPI) => {
    const response = await services.getAllCampaignCategories();
    thunkAPI.dispatch(setCategories(response));
  },
);

export const { setCategories } = campaignSlice.actions;

export const campaignReducer = campaignSlice.reducer;
