import React from "react";
import styles from "./Card.module.css";
import spliceText from "@/utils/spliceText";

const Cards = (props) => {
  function redirectToUrl() {
    window.location.href = `/recipes/${props.id}`;
  }
  return (
    <div className={styles.card_main} onClick={redirectToUrl}>
      <div className={styles.card_container} data-key={props.key}>
        <img className={styles.card_img} src={props.imgUrl} alt="dish img" />
        <p className={styles.card_mealName}>{spliceText(props.mealName)}</p>
        <div className={styles.card_favbutton}>
          <img src="/icons/star-yellow.png" alt="star icon" />
          <p>Add to Favourites</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;