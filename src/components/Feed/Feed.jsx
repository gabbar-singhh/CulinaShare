import React, { useEffect, useState } from "react";
import styles from "./Feed.module.css";
import Cards from "../Card/Card";

const Feed = (props) => {
  useEffect(() => {
    console.log("props.data", props.data);
  }, []);

  if (props.data && props.data.length > 0) {
    return (
      <section className={styles.feed_main}>
        <div className={styles.feed_container}>
          {props.data.map((meal) => (
            <Cards
              key={meal.strId}
              imgUrl={meal.strMealThumb}
              mealName={meal.strMeal}
            />
          ))}
        </div>
      </section>
    );
  } else {
    return (
      <section className={styles.feed_main}>
        <div className={styles.feed_notFound}>
          <p>Result not found :(</p>
        </div>
      </section>
    );
  }
};

export default Feed;
