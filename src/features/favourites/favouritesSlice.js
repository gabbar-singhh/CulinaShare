import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "@/lib/supabaseClient";

const initialState = {
  isError: false,
  isLoading: false,
  favouriteState: [],
};

export const fetchFavourites = createAsyncThunk(
  "fetchFavourites",
  async (inputEmail) => {
    const { data, error } = await supabase
      .from("favourite_recipes")
      .select("recipesJSON")
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
    addToFavourite: (state, action) => {
      const timestamp = new Date().toISOString();

      const newRecipe = {
        idMeal: action.payload.recipeId,
        timestamp: timestamp,
        strMeal: action.payload.recipeName,
        strMealThumb: action.payload.recipeImg,
      };

      state.favouriteState.push(newRecipe);
    },

    removeFromFavourite: (state, action) => {
      const idMealToRemove = parseInt(action.payload.id);

      const updatedState = state.favouriteState.filter(
        (item) => item.idMeal != idMealToRemove
      );

      state.favouriteState = updatedState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavourites.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      try {
        state.favouriteState = action.payload.recipesJSON;
      } catch {
        state.favouriteState = [];
      }
    });
    builder.addCase(fetchFavourites.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchFavourites.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { addToFavourite, removeFromFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;
