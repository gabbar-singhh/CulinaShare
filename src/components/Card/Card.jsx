import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";
import spliceText from "@/utils/spliceText";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite } from "@/features/favourites/favouritesSlice";
import checkIfFavourite from "@/utils/checkIfFavourite";
import getTimeById from "@/utils/getTimeById";
import { formatDistanceToNowStrict } from "date-fns";

const Cards = (props) => {
  const [favoriteButtonText, setFavoriteButtonText] =
    useState("Add to Favourites");

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favouritesReducer.favourites);

  const redirectToUrl = () => {
    window.location.href = `/recipes/${props.id}`;
  };

  const addToFavouritesHandler = () => {
    dispatch(addFavourite({ mealId: props.id }));
    setFavoriteButtonText("Added To Favourites");

    setTimeout(() => {
      setFavoriteButtonText("Add To Favourites");
    }, 300);
  };

  const mergeRecipeWithFavourites = () => {};

  return (
    <div className={styles.card_main}>
      <div className={styles.card_container} data-key={props.key}>
        <img
          className={styles.card_img}
          onClick={redirectToUrl}
          src={props.imgUrl}
          alt="dish img"
        />
        <p className={styles.card_mealName} onClick={redirectToUrl}>
          {spliceText(props.mealName)}
        </p>
        {props.isFav && (
          <p className={styles.card_mealSaved}>
            Saved {formatDistanceToNowStrict(getTimeById(props.id, favorites))}{" "}
            ago
          </p>
        )}

        {props.isFav ? (
          <>
            <div
              className={styles.card_favbutton}
              onClick={() => {
                props.removeFavouritesHandler(props.id);
              }}
            >
              <img src="/icons/star-yellow.png" alt="star icon" />

              <p>Remove from Favorites</p>
            </div>
          </>
        ) : (
          <>
            {checkIfFavourite(props.id, favorites) ? (
              <div
                className={`${styles.yes_favourite} ${styles.card_favbutton}`}
              >
                <img src="/icons/star-yellow.png" alt="star icon" />

                <p>Added to Favourites</p>
              </div>
            ) : (
              <div
                className={styles.card_favbutton}
                onClick={addToFavouritesHandler}
              >
                <img src="/icons/star-yellow.png" alt="star icon" />

                <p>{favoriteButtonText}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cards;
