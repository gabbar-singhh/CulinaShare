import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // CHECKING IF IMAGE IS LOADED OR NOT
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };

    img.src = "/assets/hero_gradient.webp";
  }, ["/assets/hero_gradient.webp"]);

  return (
    <section className={styles.hero_main}>
      <div className={styles.hero_container}>
        {imageLoaded ? (
          <img src="/assets/hero_gradient.webp" alt="background img" />
        ) : (
          <img
            src="/assets/heroPlaceholder.webp"
            alt="background img placeholder"
          />
        )}
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
            <Link href={'/recipes'}>EXPLORE NOW </Link>
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
