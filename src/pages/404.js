import React from "react";
import styles from "../styles/Custom404.module.css";
import NavigationBar from "@/components/Navigation/NavigationBar";
import Discover from "@/components/Discover/Discover";

const Custom404 = () => {
  return (
    <section className={styles.notFound_main}>
      <div className={styles.notFound_div}>
        <NavigationBar style={{ backgroundColor: "var(--primary-color)" }} />
      </div>
      <div className={styles.text404}>page not found :)</div>
      <Discover />
    </section>
  );
};

export default Custom404;
