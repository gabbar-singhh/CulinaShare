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
      const recipe = action.payload.newRecipe;

      state.favourites.push(recipe);
    },

    removeFavourite: (state, action) => {
      // Add logic to remove a favourite
      state.favourites = state.favourites.filter(
        (meal) => meal.id !== action.payload.mealId
      );
      updateFavouritesRecipe({
        favorites: state.favourites,
        emailId: action.payload.emailId,
      });
    },
    addFetchedFavouritesToState: (state, action) => {
      state.favourites = action.payload.favouritesJson;
    },
  },
});

const updateFavouritesRecipe = async (updatedFavourites) => {
  const { error } = await supabase
    .from("favourites")
    .update({ favouritesJson: updatedFavourites.favorites })
    .eq("email_id", updatedFavourites.emailId);
  if (error) {
    console.log(error);
  }
};

export const { addFavourite, removeFavourite, addFetchedFavouritesToState } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
