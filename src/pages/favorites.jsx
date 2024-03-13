"use client";

import React, { useState, useEffect } from "react";
import NavigationBar from "@/components/Navigation/NavigationBar";
import styles from "../styles/favorites.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFavourite } from "@/features/favourites/favouritesSlice";
import axios from "axios";
import Feed from "@/components/Feed/Feed";
import Discover from "@/components/Discover/Discover";
import About from "@/components/About/About";
import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";
import supabase from "@/lib/supabaseClient";
import { fetchFavourites } from "@/features/favourites/favouritesSlice";
import { insertEmptyJSON } from "@/features/favourites/favouritesSlice";

const favorites = () => {
  const favorites = useSelector((state) => state.favouritesReducer.favourites);
  const dispatch = useDispatch();

  const { user, isLoading, error } = useUser();

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
        // console.log("res: ", res);
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

  // useEffect(() => {
  //

  //   fetchFavouriteRecipes();
  //   if (isLoading) {
  //     // dispatch(fetchNotes(session.user.email));
  //     console.log(user.email);
  //     fetchFavouriteRecipes(session.user.email);
  //   }
  // }, [isLoading]);

  useEffect(() => {

    if (user) {
      console.log(user.email);
      dispatch(insertEmptyJSON(user.email))
      dispatch(fetchFavourites(user.email));
    } else if (error) {
      console.error(error);
    }
  }, [user, error]);

  return (
    <React.Fragment>
      <Head>
        <title>{`Your Saved Recipes - CulinaShare`}</title>

        <meta
          name="description"
          content="CulinaShare - Where Every Recipe Tells a Story!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <section className={styles.favorites_main}>
        <NavigationBar />
        {user ? (
          <div className={styles.favorites_container}>
            <h1>{user.name} 's Saved Recipes</h1>

            {data.length <= 0 ? (
              <>
                <div className={styles.favorites_noData}>
                  <p>no saved recipes found :)</p>
                </div>
                <Discover />
              </>
            ) : (
              <Feed
                data={data} // data again i.e, fetched!
                isFav={true}
                onClickRemove={removeFavouritesHandler}
              />
            )}
          </div>
        ) : (
          <div className={styles.favorites_container}>
            <div className={styles.favorites_noData}>
              <p>Login to see your favorites :)</p>
            </div>
            <Discover />
          </div>
        )}

        <About />
      </section>
    </React.Fragment>
  );
};

export default favorites;
