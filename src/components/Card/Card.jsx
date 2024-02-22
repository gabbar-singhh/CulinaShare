import React from "react";
import styles from "./Card.module.css";

const Cards = () => {
  return (
    <div className={styles.card_main}>
      <div className={styles.card_container}>
        <img
          className={styles.card_img}
          src="https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg"
          alt="dish img"
        />
        <p className={styles.card_mealName}>Apple Frangipan Tart</p>
        <div className={styles.card_favbutton}>
          <img src="/icons/star-yellow.png" alt="" />
          <p>Add to Favourites</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;