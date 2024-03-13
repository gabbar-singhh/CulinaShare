import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "@/lib/supabaseClient";

const initialState = {
  isError: false,
  isLoading: false,
  favourites: [],
  isEmptyArrayAdded: false,
};

export const fetchFavourites = createAsyncThunk(
  "fetchFavourites",
  async (inputEmail) => {
    const { data, error } = await supabase
      .from("favourites")
      .select("favouritesJson")
      .eq("email_id", inputEmail);

    if (error) {
      console.log(error);
    }

    return data[0];
  }
);

export const favouritesSlice = createSlice({
  name: "FAVOURITES",
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      const currentDateTime = new Date().toISOString();

      const recipe = {
        id: action.payload.mealId,
        time: currentDateTime,
      };

      state.favourites.push(recipe);
    },

    removeFavourite: (state, action) => {
      // Add logic to remove a favourite
    },
    addFetchedFavouritesToState: (state, action) => {
      state.favourites = action.payload.favouritesJson;
    },
  },
  extraReducers: (builder) => {

  },
});

export const { addFavourite, removeFavourite,addFetchedFavouritesToState } = favouritesSlice.actions;

export default favouritesSlice.reducer;
