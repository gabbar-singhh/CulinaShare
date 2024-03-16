import React from "react";
import styles from "../styles/recipes.module.css";
import Discover from "@/components/Discover/Discover";
import NavigationBar from "@/components/Navigation/NavigationBar";
import About from "@/components/About/About";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0/client";

const recipes = () => {
  const favoriteState = useSelector(
    (state) => state.favouritesReducer.favourites
  );
  const { user, isLoading, error } = useUser();

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
