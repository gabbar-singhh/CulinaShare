"use client";

import React, { useState, useEffect } from "react";
import NavigationBar from "@/components/Navigation/NavigationBar";
import styles from "../styles/favorites.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFavourite,
  addFetchedFavouritesToState,
} from "@/features/favourites/favouritesSlice";
import axios from "axios";
import Feed from "@/components/Feed/Feed";
import Discover from "@/components/Discover/Discover";
import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";
import supabase from "@/lib/supabaseClient";
import Footer from "@/components/Footer/Footer";
import toast, { Toaster } from "react-hot-toast";
import { fetchFavourites } from "@/features/favourites/favouritesSlice";

const favorites = () => {
  const favouriteState = useSelector(
    (state) => state.favouritesReducer.favouriteState
  );

  const isLoadingState = useSelector(
    (state) => state.favouritesReducer.isLoading
  );

  const dispatch = useDispatch();

  const { user, isLoading, error } = useUser();
  const [isDataLoading, setIsDataLoading] = useState(true);

  const [favouritesFromDB, setFavouritesFromDB] = useState([]);

  const sortDataByTime = (data) => {
    // return data;

    return [...data]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .reverse();
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchFavourites(user.email));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      console.log("favouriteState changed!");
      setTimeout(() => {
        insertDataIntoDB(user.email, favouriteState)
          .then((res) => {
            console.log("🟣 UPDATED!");
          })
          .catch((err) => {
            console.log("🔴 ERROR!", err);
          });
      }, 1500);
    }
  }, [favouriteState]);

  const insertDataIntoDB = async (emailId, currentFavState) => {
    const { data, error } = await supabase
      .from("favourite_recipes")
      .update({
        recipesJSON: currentFavState,
      })
      .eq("email_id", emailId)
      .select();

    if (data) return data;
    if (error) return error;
  };

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
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#e6ffc4",
              border: "1px solid green",
              color: "#000",
            },
          },
          error: {
            style: {
              background: "red",
              border: "1px solid red",
              color: "#fff",
            },
          },
          style: {
            border: "1px solid var(--secondary-color)",
            padding: "16px",
            color: "var(--secondary-color)",
          },
        }}
      />
      <section className={styles.favorites_main}>
        <NavigationBar />

        <div className={styles.favorites_container}>
          {user && <h1>{user.name} 's Saved Recipes</h1>}

          {favouriteState.length !== 0 && (
            <Feed
              data={sortDataByTime(favouriteState)} // data again i.e, fetched!
              isFav={true}
              isLoading={false}
            />
          )}
          {favouriteState.length === 0 && (
            <>
              <div className={styles.favorites_noData}>
                <p>no saved recipes found :)</p>
              </div>
              <Discover />
            </>
          )}
        </div>

        <Footer />
      </section>
    </React.Fragment>
  );
};

export default favorites;
