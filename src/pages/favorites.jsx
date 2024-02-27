"use client";

import React, { useState, useEffect } from "react";
import NavigationBar from "@/components/Navigation/NavigationBar";
import styles from "../styles/favorites.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFavourite } from "@/features/favourites/favouritesSlice";
import axios from "axios";
import Feed from "@/components/Feed/Feed";
import Discover from "@/components/Discover/Discover";

const favorites = () => {
  const favorites = useSelector((state) => state.favouritesReducer.favourites);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const fetchMealDetails = async (mealId) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      return response.data.meals[0];
    } catch (error) {
      console.error(
        `Error fetching meal details for ID ${mealId}:`,
        error.message
      );
      return null;
    }
  };

  const fetchAllMeals = async () => {
    const favoriteIds = favorites.map((favorite) => favorite.id);
    const mealIds = [...favoriteIds];

    const allMeals = await Promise.all(
      mealIds.map((id) => fetchMealDetails(id))
    );
    return allMeals.filter((meal) => meal !== null);
  };

  useEffect(() => {
    const allMeals = fetchAllMeals()
      .then((res) => {
        console.log("res: ", res);
        setData(res);
      })
      .catch(() => {
        setData({ meals: null, error: true });
      });
  }, [favorites]);

  const removeFavouritesHandler = (id) => {
    console.log("u pressed thsi!");
    dispatch(removeFavourite(id));
    console.log("favoritesfavoritesfavorites, ", favorites);
  };

  useEffect(() => {
    console.log("datadata: ", data);
  }, []);

  return (
    <section className={styles.favorites_main}>
      <NavigationBar style={{ backgroundColor: "var(--primary-color)" }} />
      <div className={styles.favorites_container}>
        <h1>your saved recipes</h1>
        {data.length <= 0 ? (
          <>
            <div className={styles.favorites_noData}>
              <p>no saved recipes found :)</p>
            </div>
            <Discover />
          </>
        ) : (
          <Feed
            data={data}
            isFav={true}
            onClickRemove={removeFavouritesHandler}
          />
        )}
      </div>
    </section>
  );
};

export default favorites;