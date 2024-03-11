import React, { useState, useRef, useEffect } from "react";
import styles from "./Card.module.css";
import spliceText from "@/utils/spliceText";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite } from "@/features/favourites/favouritesSlice";
import checkIfFavourite from "@/utils/checkIfFavourite";
import getTimeById from "@/utils/getTimeById";
import { formatDistanceToNowStrict } from "date-fns";
import { Tooltip } from "@mui/material";
import { Howl } from "howler";

const Cards = (props) => {
  const soundRef = useRef(null);
  const deleteSoundRef = useRef(null);

  const [favoriteButtonText, setFavoriteButtonText] =
    useState("Add to Favourites");

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favouritesReducer.favourites);

  const redirectToUrl = () => {
    window.location.href = `/recipes/${props.id}`;
  };

  const addToFavouritesHandler = () => {
    dispatch(addFavourite({ mealId: props.id }));
    playSound();
    setFavoriteButtonText("Added To Favourites");

    setTimeout(() => {
      setFavoriteButtonText("Add To Favourites");
    }, 300);
  };

  const playSound = () => {
    soundRef.current.play();
  };

  const playDeleteSound = () => {
    deleteSoundRef.current.play();
  };

  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/sound/multi-pop.mp3"],
    });

    return () => {
      soundRef.current.unload();
    };
  }, ["/sound/multi-pop.mp3"]);

  useEffect(() => {
    deleteSoundRef.current = new Howl({
      src: ["/sound/delete.mp3"],
    });

    return () => {
      deleteSoundRef.current.unload();
    };
  }, ["/sound/delete.mp3"]);

  return (
    <div className={styles.card_main}>
      <div className={styles.card_container} data-key={props.key}>
        <div className={styles.cardImgWrapper}>
          <img
            className={styles.card_img}
            onClick={redirectToUrl}
            src={props.imgUrl}
            alt="dish img"
          />
        </div>
        <Tooltip title={props.mealName} arrow>
          <p className={styles.card_mealName} onClick={redirectToUrl}>
            {spliceText(props.mealName)}
          </p>
        </Tooltip>

        {props.isFav && (
          <p className={styles.card_mealSaved}>
            Saved{" "}
            {formatDistanceToNowStrict(
              getTimeById(props.id, favorites) && new Date().toISOString()
            )}{" "}
            ago
          </p>
        )}

        {props.isFav ? (
          <Tooltip
            arrow
            title={`Click to remove ${props.mealName} from favourites!`}
          >
            <div
              className={`${styles.yes_favourite} ${styles.card_favbutton}`}
              onClick={() => {
                props.removeFavouritesHandler(props.id);
                playDeleteSound();
              }}
            >
              <img src="/icons/star-white.png" alt="star icon" />

              <p>Remove from Favorites</p>
            </div>
          </Tooltip>
        ) : (
          <>
            {checkIfFavourite(props.id, favorites) ? (
              <Tooltip
                arrow
                title={`${props.mealName} is added to favourites!`}
              >
                <div
                  className={`${styles.yes_favourite} ${styles.card_favbutton}`}
                >
                  <img src="/icons/star-white.png" alt="star icon" />

                  <p>Added to Favourites</p>
                </div>
              </Tooltip>
            ) : (
              <Tooltip
                arrow
                title={`Click to add ${props.mealName} to favourites`}
              >
                <div
                  className={styles.card_favbutton}
                  onClick={addToFavouritesHandler}
                >
                  <img src="/icons/star-brown.png" alt="star icon" />

                  <p>{favoriteButtonText}</p>
                </div>
              </Tooltip>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cards;
