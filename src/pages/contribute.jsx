import React from "react";
import styles from "../styles/contribute.module.css";
import NavigationBar from "@/components/Navigation/NavigationBar";
import About from "@/components/About/About";

const contribute = () => {
  return (
    <section className={styles.contribute_main}>
      <NavigationBar/>
      <div className={styles.contribute_container}>
        <h1>Contribute to Our DataBase</h1>
        <form action="">
            
        </form>
      </div>
      <About/>
    </section>
  );
};

export default contribute;