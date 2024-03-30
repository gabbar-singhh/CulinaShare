import React, { useEffect } from "react";
import styles from "../styles/recipes.module.css";
import Discover from "@/components/Discover/Discover";
import NavigationBar from "@/components/Navigation/NavigationBar";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0/client";
import Footer from "@/components/Footer/Footer";
import { fetchFavourites } from "@/features/favourites/favouritesSlice";
import supabase from "@/lib/supabaseClient";

const recipes = () => {
  const dispatch = useDispatch();
  const favouriteState = useSelector(
    (state) => state.favouritesReducer.favouriteState
  );
  const { user, isLoading, error } = useUser();

  useEffect(() => {
    if (user) {
      dispatch(fetchFavourites(user.email));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
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
        <title>{`Discover new recipes - Culina Share`}</title>
        <meta
          name="description"
          content="CulinaShare - Where Every Recipe Tells a Story!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <section className={styles.recipes_main}>
        <NavigationBar />
        <Discover />
        <Footer />
      </section>
    </React.Fragment>
  );
};

export default recipes;
