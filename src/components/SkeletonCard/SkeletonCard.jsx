import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SkeletonCard.module.css";

const SkeletonCard = () => {
  return (
    <div className={styles.card_main}>
      <div className={styles.card_container}>
        <span>
          <Skeleton height={200}/>
        </span>
        <p className={styles.card_mealName}>
          <Skeleton height={10} />
          <Skeleton height={10} />
        </p>
        <div className={styles.card_favbutton}>
          <Skeleton height={25} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;