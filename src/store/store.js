import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "../features/favourites/favouritesSlice";

export const store = configureStore({
  reducer: { favouritesReducer },
});
 