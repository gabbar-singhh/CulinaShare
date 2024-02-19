import React from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero_main}>
      <div className={styles.hero_container}>
        <h1 className={styles.hero_h1}>Discover. Share. Save.</h1>
        <img src="/assets/bowl_hero.png" alt="shawarma img" />
        <h1 className={styles.hero_h1}>recipes</h1>
      </div>
    </section>
  );
};

export default HeroSection;