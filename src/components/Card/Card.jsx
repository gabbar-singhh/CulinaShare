import React, { useState, useRef, useEffect } from "react";
import styles from "./Card.module.css";
import spliceText from "@/utils/spliceText";
import { useDispatch, useSelector } from "react-redux";
import checkIfFavourite from "@/utils/checkIfFavourite";
import getTimeById from "@/utils/getTimeById";
import { formatDistanceToNowStrict } from "date-fns";
import { Tooltip } from "@mui/material";
import { Howl } from "howler";
import { useUser } from "@auth0/nextjs-auth0/client";
import supabase from "@/lib/supabaseClient";
import CircularLoader from "../CircularLoader/CircularLoader";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { addToFavourite } from "@/features/favourites/favouritesSlice";

const Cards = (props) => {
  const { user, isLoading, error } = useUser();
  const dispatch = useDispatch();
  const favouriteState = useSelector(
    (state) => state.favouritesReducer.favouriteState
  );
  const soundRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [favouritesFromDB, setFavouritesFromDB] = useState([]);

  const [favoriteButtonText, setFavoriteButtonText] =
    useState("Add to Favourites");

  const playSound = () => {
    soundRef.current.play();
  };

  // USEEFFECT FOR "ADDED TO FAVS" AUDIO
  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/sound/multi-pop.mp3"],
    });

    return () => {
      soundRef.current.unload();
    };
  }, ["/sound/multi-pop.mp3"]);

  // CHECKING IF IMAGE IS LOADED OR NOT
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };

    img.src = props.imgUrl;
  }, [props.imgUrl]);

  const addToFavouritesHandler = () => {
    if (user) {
      console.log("⚪️ you clicked fav.button");
      dispatch(
        addToFavourite({
          recipeId: props.id,
          emailId: user.email,
          recipeName: props.mealName,
          recipeImg: props.imgUrl,
        })
      );
      toast.success(`${props.mealName} added to favourites!`);
    } else {
      toast.error("Sign in to add favourites");
    }
  };

  useEffect(() => {
  //  console.log("props=>",props);
  }, [])

  return (
    <React.Fragment>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#e6ffc4",
              border: "1px solid green",
              color: "#000",
            },
          },
          error: {
            style: {
              background: "red",
              border: "1px solid red",
              color: "#fff",
            },
          },
          style: {
            border: "1px solid var(--secondary-color)",
            padding: "16px",
            color: "var(--secondary-color)",
          },
        }}
      />
      <div className={styles.card_main}>
        <div className={styles.card_container} data-key={props.key}>
          <div className={styles.cardImgWrapper} style={props.customStyle}>
            {/* IF CARD IMAGE IS LOADED OR NOT, IF NOT THEN SHOW ORANGE-LOADER GIF INSTEAD */}
            {imageLoaded ? (
              <Link href={`/recipes/${parseInt(props.id)}`}>
                <img
                  className={styles.card_img}
                  src={props.imgUrl}
                  alt="dish img"
                  loading="lazy"
                />
              </Link>
            ) : (
              <img
                className={styles.card_img}
                src={"/assets/notLoaded.gif"}
                alt="dish img"
              />
            )}
          </div>
          <Link href={`/recipes/${parseInt(props.id)}`}>
            <Tooltip title={props.mealName} arrow>
              <p className={styles.card_mealName}>
                {spliceText(props.mealName)}
              </p>
            </Tooltip>
          </Link>

          {/* FOR FAVOURITES PAGE: IF isFav IS TRUE, WHICH MEAN THAT KI CARD WILL ACT FOR FAVOURITES, IT WILL SHOW RELATIVE TIME */}
          {props.isFav && (
            <p className={styles.card_mealSaved}>
              Saved{" "}
              {formatDistanceToNowStrict(getTimeById(props.id, props.data))} ago
            </p>
          )}

          {props.isFav ? (
            <div
              className={`${styles.yes_favourite} ${styles.card_favbutton}`}
              onClick={() => {
                props.removeFavouritesHandler({
                  mealId: props.id,
                  emailId: user.email,
                });
              }}
            >
              <img src="/icons/star-white.png" alt="star icon" />

              <p>Remove from Favorites</p>
            </div>
          ) : (
            <>
              {checkIfFavourite(props.id, props.data) ? (
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
                <div
                  className={styles.card_favbutton}
                  onClick={addToFavouritesHandler}
                >
                  <img src="/icons/star-brown.png" alt="star icon" />
                  <p>{favoriteButtonText}</p>{" "}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cards;

//  <div className={styles.card_favbutton}>
{
  /* <CircularLoader /> */
}
// </div>
