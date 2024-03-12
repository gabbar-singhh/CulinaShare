import React, { useEffect, useState } from "react";
import styles from "../styles/recipes.module.css";
import Discover from "@/components/Discover/Discover";
import NavigationBar from "@/components/Navigation/NavigationBar";
import About from "@/components/About/About";
import Head from "next/head"; 

const recipes = () => {
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
