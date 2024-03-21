import React, { useEffect } from "react";
import styles from "./SuggestionCards.module.css";
import Cards from "../Card/Card";

const SuggestionCards = ({ data }) => {
  // useEffect(() => {
  //  console.log("sugg", data)
  // }, [])

  return (
    <section className={styles.suggestionCardsMain}>
      <h2>Recipes you might like, </h2>

      <div className={styles.cardContainer}>
        {data.map((recipe, index) => {
          return (
            <Cards
              key={index}
              id={recipe.idMeal}
              imgUrl={recipe.strMealThumb}
              mealName={recipe.strMeal}
              isFav={recipe.isFav || false}
              customStyle={{ width: "300px", height: "au" }}
              removeFavouritesHandler={recipe.onClickRemove}
            />
          );
        })}
      </div>
    </section>
  );
};

export default SuggestionCards;
