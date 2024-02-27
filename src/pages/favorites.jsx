import React from "react";
import NavigationBar from "@/components/Navigation/NavigationBar";
import styles from "../styles/favorites.module.css";

const favorites = () => {
  return (
    <section className={styles.favorites_main}>
      <div className={styles.favorites_div}>
        <NavigationBar style={{ backgroundColor: "var(--primary-color)" }} />
      </div>
    </section>
  );
};

export default favorites;