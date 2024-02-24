import React, { useEffect, useState } from "react";
import styles from "./Feed.module.css";
import Cards from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

const Feed = (props) => {
  const [currentPage, setcurrentPage] = useState(1);
  const [mealsPerPage, setMealsPerPage] = useState(15);

  const lastMealIndex = currentPage * mealsPerPage;
  const firstMealIndex = lastMealIndex - mealsPerPage;
  let currentMeals = [];
  if (props.data) {
    currentMeals = props.data.slice(firstMealIndex, lastMealIndex);
  }

  useEffect(() => {
    console.log(props.data);
  }, []);

  if (props.data) {
    return (
      <section className={styles.feed_main}>
        <div className={styles.feed_container}>
          {currentMeals.map((meal) => (
            <Cards
              key={meal.strId}
              imgUrl={meal.strMealThumb}
              mealName={meal.strMeal}
            />
          ))}
        </div>
        <Pagination
          totalMeals={props.data.length}
          mealsPerPage={mealsPerPage}
          setCurrentPage={setcurrentPage}
        />
      </section>
    );
  }

  if (props.data === null) {
    return (
      <section className={styles.feed_main}>
        <div className={styles.feed_notFound}>
          <p>Result not found :(</p>
        </div>
      </section>
    );
  }

  if (props.isLoading) {
    const num = [];
    for (let i = 1; i <= 15; i++) {
      num.push(i);
    }
    return (
      <section className={styles.feed_main}>
        <div className={styles.feed_container}>
          {num.map(() => {
            return <SkeletonCard />;
          })}
        </div>
      </section>
    );
  }
};

export default Feed;
