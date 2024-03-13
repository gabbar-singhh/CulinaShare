import React, { useEffect, useState } from "react";
import styles from "../styles/recipes.module.css";
import Discover from "@/components/Discover/Discover";
import NavigationBar from "@/components/Navigation/NavigationBar";
import About from "@/components/About/About";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0/client";
import supabase from "@/lib/supabaseClient";

const recipes = () => {
  const favoriteState = useSelector(
    (state) => state.favouritesReducer.favourites
  );
  const { user, isLoading, error } = useUser();

  // useEffect(() => {
  //   if (user) {
  //     updateFavouritesRecipe({ favorites: favoriteState, emailId: user.email });
  //   } else if (error) {
  //     console.error(error);
  //   }
  // }, [favoriteState]);

  // const updateFavouritesRecipe = async (updatedFavourites) => {
  //   const { error } = await supabase
  //     .from("favourites")
  //     .update({ favouritesJson: updatedFavourites.favorites })
  //     .eq("email_id", updatedFavourites.emailId);
  //   if (error) {
  //     console.log(error);
  //   }
  // };
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
        <About />
      </section>
    </React.Fragment>
  );
};

export default recipes;
