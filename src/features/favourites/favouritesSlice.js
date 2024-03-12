import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFavourites = createAsyncThunk(
  "fetchFavourites",
  async (input_email) => {
    const data = await supabase
      .from("favourites")
      .select("favourites")
      .eq("email_id", input_email);

    console.log("asyncthunk: ", data);
  }
);

const initialState = {
  favourites: [
    // { id: "52808", time: "2024-03-12T16:40:08.495Z" },
    // { id: "52844", time: "2024-03-12T16:40:10.441Z" },
    // { id: "52843", time: "2024-03-12T16:40:11.424Z" },
    // { id: "52884", time: "2024-03-12T16:40:13.409Z" },
    // { id: "52973", time: "2024-03-12T16:40:13.992Z" },
    // { id: "52877", time: "2024-03-12T16:40:30.061Z" },
    // { id: "52821", time: "2024-03-12T16:40:44.577Z" },
    // { id: "53009", time: "2024-03-12T16:41:32.126Z" },
  ],
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
