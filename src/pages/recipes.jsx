import React, { useEffect, useState } from "react";
import styles from "../styles/recipes.module.css";
import Discover from "@/components/Discover/Discover";
import NavigationBar from "@/components/Navigation/NavigationBar";
import About from "@/components/About/About";
const recipes = () => {
  return (
    <section className={styles.recipes_main}>
      <NavigationBar />
      <Discover />
      <About />
    </section>
  );
};

export default recipes;