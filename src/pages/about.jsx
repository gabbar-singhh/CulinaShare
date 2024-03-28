import React, { useEffect, useState } from "react";
import Head from "next/head";
import NavigationBar from "@/components/Navigation/NavigationBar";
import Footer from "@/components/Footer/Footer";
import styles from "../styles/about.module.css";

const about = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // CHECKING IF PROFILE IMAGE IS LOADED OR NOT
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };

    img.src = "/assets/hero_gradient.webp";
  }, ["/assets/hero_gradient.webp"]);
  return (
    <React.Fragment>
      <Head>
        <title>{`About CulinaShare`}</title>
        <meta
          name="description"
          content="CulinaShare - Where Every Recipe Tells a Story!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <NavigationBar />
      <section className={styles.aboutMain}>
        <div className={styles.aboutContainer}>
          <h3>our mission</h3>

          <h1>Cultivating Culinary Creativity + Community Connection</h1>

          <p>
            CulinaShare aims to create a community where users can explore a
            wide variety of recipes, contribute their own, and curate their
            collection of favorites. The platform seeks to inspire culinary
            creativity and make cooking accessible to everyone, from beginners
            to gourmet chefs.
          </p>
          {imageLoaded ? (
            <img src="/assets/profile.webp" alt="profile img" />
          ) : (
            <img src="/assets/profileBlur.webp" alt="profile img" />
          )}
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default about;
