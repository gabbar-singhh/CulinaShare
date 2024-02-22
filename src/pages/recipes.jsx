import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/recipes.module.css";
import Discover from "@/components/Discover/Discover";
import NavigationBar from "@/components/Navigation/NavigationBar";
const recipes = () => {
  const [data, setData] = useState([]);

  useEffect(() => {}, []);
  return (
    <section className={styles.recipes_main}>
      <div className={styles.recipes_div}>
      <NavigationBar style={{ backgroundColor: "var(--primary-color)" }} />
      </div>
      <Discover />
    </section>
  );
};

export default recipes;
