import React from "react";
import styles from "../styles/contribute.module.css";
import NavigationBar from "@/components/Navigation/NavigationBar";

const contribute = () => {
  return (
    <section className={styles.contribute_main}>
      <NavigationBar style={{ backgroundColor: "var(--primary-color)" }} />
      <div className={styles.contribute_container}>
        <h1>Contribute to Our DataBase</h1>
        <form action="">
            
        </form>
      </div>
    </section>
  );
};

export default contribute;