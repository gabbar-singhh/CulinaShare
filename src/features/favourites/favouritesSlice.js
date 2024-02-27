import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
};

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
      state.favourites = state.favourites.filter(
        (meal) => meal.id !== action.payload
      );
    },
  },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;
