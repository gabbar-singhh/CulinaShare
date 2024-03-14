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
import { useUser } from "@auth0/nextjs-auth0/client";
import { ToastContainer, toast } from "react-toastify";
import supabase from "@/lib/supabaseClient";
import CircularLoader from "../CircularLoader/CircularLoader";

const Cards = (props) => {
  const { user, isLoading, error } = useUser();
  const soundRef = useRef(null);
  const deleteSoundRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [favouritesFromDB, setFavouritesFromDB] = useState([]);

  const [favoriteButtonText, setFavoriteButtonText] =
    useState("Add to Favourites");

  const [showFavouriteLoading, setShowFavouriteLoading] = useState(false);

  const dispatch = useDispatch();
  const favoriteState = useSelector(
    (state) => state.favouritesReducer.favourites
  );

  const redirectToUrl = () => {
    window.location.href = `/recipes/${props.id}`;
  };

  const addToFavouritesHandler = () => {
    const currentDateTime = new Date().toISOString();
    if (user) {
      setShowFavouriteLoading(true);
      setFavoriteButtonText("Added To Favourites");
      playSound();

      // NEW RECIPE OBJ, THAT NEEDS TO BE PUSHED TO FAVOURITESTATE
      const newRecipe = {
        id: props.id,
        time: currentDateTime,
      };

      // DISPATCHING NEW RECIPE OBJ TO SET TO FAVOURITESTATE TO GETTING UPDATED FAVOURITES
      dispatch(addFavourite({ newRecipe: newRecipe }));

      // SENDING THE RECIPE-FAVS WITH NEW RECIPE ALSO! UPDATING THE OBJ WITH PREV-VALUES TO GETTING THE LATEST DATA
      updateFavouritesRecipe({
        favorites: [...favoriteState, newRecipe],
        emailId: user.email,
      });

      setTimeout(() => {
        setFavoriteButtonText("Add To Favourites");
      }, 300);
    } else {
      toast.error("Sign in to save your Favorites.");
    }
  };

  const playSound = () => {
    soundRef.current.play();
  };

  const playDeleteSound = () => {
    deleteSoundRef.current.play();
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

  // USEEFFECT FOR "DELETE" AUDIO
  useEffect(() => {
    deleteSoundRef.current = new Howl({
      src: ["/sound/delete.mp3"],
    });

    return () => {
      deleteSoundRef.current.unload();
    };
  }, ["/sound/delete.mp3"]);

  // CHECKING IF IMAGE IS LOADED OR NOT
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };

    img.src = props.imgUrl;
  }, [props.imgUrl]);

  const updateFavouritesRecipe = async (updatedFavourites) => {
    const { error } = await supabase
      .from("favourites")
      .update({ favouritesJson: updatedFavourites.favorites })
      .eq("email_id", updatedFavourites.emailId);
    if (error) {
      console.log(error);
    }
  };

  const fetchFavourites = async (userEmail) => {
    const { data, error } = await supabase
      .from("favourites")
      .select("favouritesJson")
      .eq("email_id", userEmail);

    if (error) {
      console.log(error);
    }

    return data[0];
  };

  // USEEFFECT FOR SETTING THE LABEL TO "ADDED TO FAVOURITES", IF THEY HAVE BEEN ADDED TO FAVS PREVIOUSLY
  useEffect(() => {
    if (user) {
      fetchFavourites(user.email)
        .then((data) => {
          setFavouritesFromDB(data.favouritesJson);
          setShowFavouriteLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (error) {
      console.error(error);
    }
  }, [favoriteState]);

  return (
    <React.Fragment>
      <div className={styles.card_main}>
        <div className={styles.card_container} data-key={props.key}>
          <div className={styles.cardImgWrapper}>
            {/* IF CARD IMAGE IS LOADED OR NOT, IF NOT THEN SHOW ORANGE-LOADER GIF INSTEAD */}
            {imageLoaded ? (
              <img
                className={styles.card_img}
                onClick={redirectToUrl}
                src={props.imgUrl}
                alt="dish img"
                loading="lazy"
              />
            ) : (
              <img
                className={styles.card_img}
                onClick={redirectToUrl}
                src={"/assets/notLoaded.gif"}
                alt="dish img"
              />
            )}
          </div>
          <Tooltip title={props.mealName} arrow>
            <p className={styles.card_mealName} onClick={redirectToUrl}>
              {spliceText(props.mealName)}
            </p>
          </Tooltip>

          {/* FOR FAVOURITES PAGE: IF isFav IS TRUE, WHICH MEAN THAT KI CARD WILL ACT FOR FAVOURITES, IT WILL SHOW RELATIVE TIME */}
          {props.isFav && (
            <p className={styles.card_mealSaved}>
              Saved{" "}
              {formatDistanceToNowStrict(getTimeById(props.id, favoriteState))}{" "}
              ago
            </p>
          )}

          {props.isFav ? (
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
          ) : (
            <>
              {checkIfFavourite(props.id, favouritesFromDB) ? (
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
                  {showFavouriteLoading ? (
                    <CircularLoader />
                  ) : (
                    <>
                      <img src="/icons/star-brown.png" alt="star icon" />
                      <p>{favoriteButtonText}</p>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition="bounce"
      />
    </React.Fragment>
  );
};

export default Cards;
