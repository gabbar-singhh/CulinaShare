import React from "react";
import styles from "./HeroSection.module.css";
import { TypeAnimation } from "react-type-animation";

const HeroSection = () => {
  return (
    <section className={styles.hero_main}>
      <div className={styles.hero_container}>
        <img src="/assets/hero_gradient.png" alt="background img" />
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

          <div className={styles.discover_button}>
            EXPLORE NOW{" "}
            <img
              className={styles.next_icon}
              src="/icons/next_arrow.svg"
              alt="next arrow icon"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
