import React from "react";
import styles from "./Card.module.css";

const Card = () => {
  return (
    <div className={styles.card_main}>
      <div className={styles.card_container}>
        <img
          className={styles.card_img}
          src="https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg"
          alt="dish img"
        />
        <p className={styles.card_mealArea}>British</p>
        <p className={styles.card_mealName}>Apple Frangipan Tart</p>
      </div>
    </div>
  );
};

export default Card;
