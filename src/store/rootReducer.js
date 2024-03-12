import { combineReducers } from "@reduxjs/toolkit";
import favouritesSlice from "../features/favourites/favouritesSlice";

const rootReducer = combineReducers({
    favouritesReducer: favouritesSlice
});

export default rootReducer;
