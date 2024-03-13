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

export const insertEmptyJSON = createAsyncThunk(
  "insertEmptyJSON",
  async (inputEmail) => {
    const { error } = await supabase
      .from("favourites")
      .insert({ email_id: inputEmail, favouritesJson: [] });

    if (error) {
      console.log(error);
    }
  }
);

export const favouritesSlice = createSlice({
  name: "FAVOURITES",
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      // Add logic to add a favourite
    },

    removeFavourite: (state, action) => {
      // Add logic to remove a favourite
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favourites = action.payload.favouritesJson;
      })
      .addCase(fetchFavourites.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(insertEmptyJSON.pending, (state) => {
        state.isEmptyArrayAdded = false;
      })
      .addCase(insertEmptyJSON.fulfilled, (state) => {
        state.isEmptyArrayAdded = true;
      })
      .addCase(insertEmptyJSON.rejected, (state) => {
        state.isEmptyArrayAdded = false;
      });
  },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;