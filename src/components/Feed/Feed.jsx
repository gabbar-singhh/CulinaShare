import React, { useEffect, useState } from "react";
import styles from "./Feed.module.css";
import Cards from "../Card/Card";
import Pagination from "../Pagination/Pagination";

const Feed = (props) => {
  const [currentPage, setcurrentPage] = useState(1);
  const [mealsPerPage, setMealsPerPage] = useState(15);

  const lastMealIndex = currentPage * mealsPerPage;
  const firstMealIndex = lastMealIndex - mealsPerPage;

  const currentMeals = props.data.slice(firstMealIndex, lastMealIndex);

  useEffect(() => {
    console.log("props.data.length", props.data.length);
  }, []);

  if (props.data && props.data.length > 0) {
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
