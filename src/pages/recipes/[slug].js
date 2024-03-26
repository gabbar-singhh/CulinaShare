"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./[slug].module.css";
import NavigationBar from "@/components/Navigation/NavigationBar";
import seperateLines from "@/utils/seperateLines";
import formatRecipeIngredients from "@/utils/formatRecipeIngredients";
import extractDomain from "extract-domain";
import Link from "next/link";
import { useState } from "react";
import getYouTubeID from "get-youtube-id";
import { Tooltip } from "@mui/material";
import Head from "next/head";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import SuggestionCards from "@/components/SuggestionCards/SuggestionCards";
import shuffle from "@/utils/shuffle";
import supabase from "@/lib/supabaseClient";
import { useUser } from "@auth0/nextjs-auth0/client";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import checkIfFavourite from "@/utils/checkIfFavourite";
import {
  addToFavourite,
  removeFromFavourite,
} from "@/features/favourites/favouritesSlice";
import CircularLoader from "../../components/CircularLoader/CircularLoader";
import { fetchFavourites } from "@/features/favourites/favouritesSlice";

export default function BlogPost({ meal, suggestions }) {
  const router = useRouter();
  const { slug } = router.query;
  const { user, isLoading, error } = useUser();
  const [clipCopyText, setClipCopyText] = useState("click to copy");
  const favouriteState = useSelector(
    (state) => state.favouritesReducer.favouriteState
  );
  const [favouriteIsLoading, setFavouriteIsLoading] = useState(false);
  const [favoriteButtonText, setFavoriteButtonText] =
    useState("Add to Favourites");

  const dispatch = useDispatch();

  const recipe = meal.meals[0];

  const shareToSocial = (event) => {
    const TYPE = event.target.getAttribute("data-key");

    switch (TYPE) {
      case "CLIPBOARD":
        navigator.clipboard.writeText(window.location.href);
        setClipCopyText("copied!");
        setTimeout(() => {
          setClipCopyText("click to copy");
        }, 5000);
        break;
      case "FACEBOOK":
        const facebookUrl = `http://www.facebook.com/share.php?u=https://culina-share.vercel.app/recipe/${slug}`;
        window.open(facebookUrl, "_blank", "popup");
        break;
      case "WHATSAPP":
        const whatsappBody = `Hey, I found this amazing website where you get all the recipes for free. Checkout this - ${"https://culina-share.vercel.app"} \n \nFor instance, I found this amazing ${
          recipe.strMeal
        } at https://culina-share.vercel.app/recipe/${slug}`;

        const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
          whatsappBody
        )}`;
        window.open(whatsappUrl, "_blank");
        break;
      case "EMAIL":
        const emailBody = `Hey, I found this amazing website where you get all the recipes for free. Checkout this - ${"https://culina-share.vercel.app"} \n \nFor instance, i found this amazing ${
          recipe.strMeal
        } at https://culina-share.vercel.app/recipe/${slug} \n \nThanks!`;
        const emailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to&body=${encodeURIComponent(
          emailBody + "\n\n"
        )}`;
        window.open(emailUrl, "_blank", "popup");
        break;
      case "TWITTER":
        const tweetBody = `Hey, I found this amazing website where you get all the recipes for free. Checkout this - ${"https://culina-share.vercel.app"} \n \nFor instance, I found this amazing ${
          recipe.strMeal
        } at https://culina-share.vercel.app/recipe/${slug}`;
        const tweetMessage = encodeURIComponent(tweetBody);
        const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetMessage}`;
        window.open(tweetUrl, "_blank", "popup");
        break;
      default:
        // Handle default case if needed
        break;
    }
  };

  const reportRecipe = async () => {
    if (user) {
      const { error } = await supabase
        .from("reported_recipes")
        .insert({ email_id: user.email, recipe_id: slug });

      toast.success(`${recipe.strMeal} reported successfully!`);
      if (error) {
        toast.error(`unknown error occured`);
      }
    } else {
      const { error } = await supabase
        .from("reported_recipes")
        .insert({ recipe_id: slug });

      if (error) {
        toast.error(`unknown error occured`);
      } else {
        toast.success(`${recipe.strMeal} reported successfully!`);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        insertDataIntoDB(user.email, favouriteState)
          .then((res) => {
            console.log("🟣 UPDATED!");
          })
          .catch((err) => {
            console.log("🔴 ERROR!", err);
          });
      }, 1500);
    }
  }, [favouriteState]);

  const insertDataIntoDB = async (emailId, currentFavState) => {
    const { data, error } = await supabase
      .from("favourite_recipes")
      .update({
        recipesJSON: currentFavState,
      })
      .eq("email_id", emailId)
      .select();

    if (data) return data;
    if (error) return error;
  };

  const deleteFavouritesHandler = () => {
    if (user) {
      console.log("⚪️ you clicked fav.remove.button");
      dispatch(
        removeFromFavourite({
          id: slug,
        })
      );
      toast.success(`${recipe.strMeal} removed successfully!`);
    } else {
      toast.error("unkown error occured");
    }
  };

  const addToFavouritesHandler = () => {
    setFavouriteIsLoading(true);
    setTimeout(() => {
      if (user) {
        console.log("⚪️ you clicked fav.button");
        dispatch(
          addToFavourite({
            recipeId: slug,
            recipeName: recipe.strMeal,
            recipeImg: recipe.strMealThumb,
          })
        );
        toast.success(`${recipe.strMeal} added to favourites!`);
        setFavouriteIsLoading(false);
        setFavoriteButtonText("added to favourites");
      } else {
        toast.error("Sign in to add favourites");
      }
    }, 1300);
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchFavourites(user.email));
    }
  }, [user]);

  if (meal) {
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
        <Head>
          <title>{`${recipe.strMeal} - CulinaShare`}</title>
          <meta
            name="description"
            content="CulinaShare - Where Every Recipe Tells a Story!"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.svg" />

          {/* OG META TAGS */}
          <meta
            property="og:title"
            content={`Learn how to prepare ${recipe.strMeal}`}
          />
          <meta property="og:description" content={`CulinaShare`} />
          <meta property="og:image" content={recipe.strMealThumb} />
        </Head>
        <NavigationBar />
        <section className={styles.page_main}>
          <div className={styles.page_container}>
            <h1 className={styles.mealName}>{recipe.strMeal}</h1>
            <h3 className={styles.mealArea}>{recipe.strArea}</h3>

            <span className={styles.mealImg}>
              <img src={recipe.strMealThumb} alt="meal img" />
            </span>
            <div className={styles.mealprepare}>
              <div>
                <h2>ingredients you'll need</h2>
                <ul>
                  {formatRecipeIngredients(recipe).map((item, index) => {
                    return (
                      <li key={index}>
                        {item.strIngredient}: {item.strMeasure}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className={styles.mealInstructions}>
              <div>
                <h2>steps to prepare</h2>
                <ol>
                  {seperateLines(recipe.strInstructions).map((step, index) => {
                    return <li key={index}>{step}</li>;
                  })}
                </ol>
              </div>
            </div>

            <div className={styles.mealVideo}>
              <div>
                <h2>hands-on walkthrough</h2>

                <iframe
                  width="100%"
                  height="500px"
                  className={styles.mealPlayer}
                  src={`https://www.youtube.com/embed/${getYouTubeID(
                    recipe.strYoutube
                  )}`}
                ></iframe>
              </div>
            </div>

            <div className={styles.goPrevious}>
              <div>
                <hr
                  style={{
                    width: "100%",
                    height: "8px",
                    backgroundColor: "var(--primary-color)",
                    outline: "none",
                    border: "none",
                    marginBottom: "10px",
                  }}
                />
                <Link href={"/recipes"} className={styles.recipeText}>
                  {" "}
                  {"<"}All Recipes
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.sourceBox}>
              <Image src="/icons/user.svg" height={50} width={50} alt="" />
              {recipe.strSource ? (
                <Link href={recipe.strSource} className={styles.sourceText}>
                  {extractDomain(recipe.strSource)}
                </Link>
              ) : (
                <p className={styles.sourceText}>{"unknown"}</p>
              )}
            </div>

            <div className={styles.mealSocialShare}>
              <div>
                <h2>Share: </h2>
                <ul className={styles.socialIcons}>
                  <Tooltip title={clipCopyText} arrow placement="bottom">
                    <li onClick={shareToSocial} data-key="CLIPBOARD">
                      <img
                        src="/icons/copy.png"
                        data-key="CLIPBOARD"
                        alt="clipboard icon"
                      />
                    </li>
                  </Tooltip>
                  <Tooltip title="share on facebook" arrow placement="bottom">
                    <li onClick={shareToSocial} data-key={"FACEBOOK"}>
                      <img
                        src="/icons/facebook.png"
                        data-key={"FACEBOOK"}
                        alt="facebook icon"
                      />
                    </li>
                  </Tooltip>
                  <Tooltip title="share on whatsapp" arrow placement="bottom">
                    <li onClick={shareToSocial} data-key={"WHATSAPP"}>
                      <img
                        src="/icons/whatsapp.png"
                        data-key={"WHATSAPP"}
                        alt="whatsapp icon"
                      />
                    </li>
                  </Tooltip>
                  <Tooltip title="share via email" arrow placement="bottom">
                    <li onClick={shareToSocial} data-key={"EMAIL"}>
                      <img
                        src="/icons/email.png"
                        data-key={"EMAIL"}
                        alt="email icon"
                      />
                    </li>
                  </Tooltip>
                  <Tooltip title="share on twitter" arrow placement="bottom">
                    <li onClick={shareToSocial} data-key={"TWITTER"}>
                      <img
                        src="/icons/twitter.png"
                        data-key={"TWITTER"}
                        alt="twitter icon"
                      />
                    </li>
                  </Tooltip>
                </ul>
              </div>
            </div>

            <div className={styles.reportRecipe} onClick={reportRecipe}>
              <img src="/icons/report.svg" alt="report icon" />
              <p>find anything unusual? report this recipe!</p>
            </div>

            <div className={styles.favouriteButton}>
              {checkIfFavourite(slug, favouriteState) ? (
                <div
                  onClick={deleteFavouritesHandler}
                  className={`${styles.yes_favourite} ${styles.card_favbutton}`}
                >
                  <img src="/icons/star-white.png" alt="star icon" />

                  <p>Remove from Favourites</p>
                </div>
              ) : (
                <>
                  {favouriteIsLoading ? (
                    <>
                      <div className={styles.card_favbutton}>
                        <CircularLoader />
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        onClick={addToFavouritesHandler}
                        className={`${styles.card_favbutton}`}
                      >
                        <img src="/icons/star-brown.png" alt="star icon" />

                        <p>{favoriteButtonText}</p>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            <SuggestionCards data={suggestions} />
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const slugResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${slug}`
  );
  const meal = await slugResponse.json();

  const { strCategory } = meal.meals[0];

  const suggestionResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`
  );

  let suggestions = await suggestionResponse.json();
  suggestions = shuffle(suggestions.meals, meal.idMeal);

  // ONLY SHOWING 4 SUGGESTION CARD
  if (suggestions.length > 4) {
    suggestions = suggestions.slice(0, 4);
  }

  return {
    props: { meal, suggestions },
  };
}
