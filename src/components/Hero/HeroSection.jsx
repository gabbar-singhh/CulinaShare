import React from "react";
import styles from "./HeroSection.module.css";
import { TypeAnimation } from "react-type-animation";

const HeroSection = () => {
  return (
    <section className={styles.hero_main}>
      <div className={styles.hero_container}>
        <h1 className={`${styles.hero_h1} animate__animated animate__fadeInUp`}>
          Discover. Share. Save.
        </h1>

        <img
          src="/assets/bowl_hero.png"
          className="animate__animated animate__fadeInUp"
          alt="shawarma img"
        />

        <h1 className={`${styles.hero_h1} animate__animated animate__fadeInUp`}>
          recipes
        </h1>
      </div>

      <div className={styles.hero_container_mobile}>
        <img src="/assets/hero_gradient.png" alt="" />
        <div className={styles.content_box}>
          <TypeAnimation
            sequence={[
              "Discover. Share. Save.",
              1000,
              "Find by categories.",
              1000,
              "Contribute to Database.",
              1000,
            ]}
            wrapper="h1"
            speed={50}
            repeat={Infinity}
            className={styles.top_text}
          />
          <h1 className={styles.bottom_text}>recipes</h1>

          <div className={styles.discover_button}>Discover!</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
