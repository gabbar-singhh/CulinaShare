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

export default function BlogPost({ meal, suggestions }) {
  const router = useRouter();
  const { slug } = router.query;
  const [clipCopyText, setClipCopyText] = useState("click to copy");

  const recipe = meal.meals[0];

  const copyToClipboardHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    setClipCopyText("copied!");

    setTimeout(() => {
      setClipCopyText("click to copy");
    }, 5000);
  };

  const shareToFacebookHandler = () => {
    const url = `http://www.facebook.com/share.php?u=https://culina-share.vercel.app/recipe/${slug}`;

    window.open(url, "_blank", "popup");
  };

  const shareToEmailHandler = () => {
    const defaultBody = `Hey, I found this amazing website where you get all the recipes for free. Checkout this - ${"https://culina-share.vercel.app"} \n \nFor instance, i found this amazing ${
      recipe.strMeal
    } at https://culina-share.vercel.app/recipe/${slug} \n \nThanks!`;

    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to&body=${encodeURIComponent(
      defaultBody + "\n\n"
    )}`;

    window.open(mailtoLink, "_blank", "popup");
  };

  const shareToTwitterHandler = () => {
    const defaultBody = `Hey, I found this amazing website where you get all the recipes for free. Checkout this - ${"https://culina-share.vercel.app"} \n \nFor instance, I found this amazing ${
      recipe.strMeal
    } at https://culina-share.vercel.app/recipe/${slug}`;

    const tweetText = encodeURIComponent(defaultBody);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

    window.open(tweetUrl, "_blank", "popup");
  };

  const shareToWhatsAppHandler = () => {
    const message = `Hey, I found this amazing website where you get all the recipes for free. Checkout this - ${"https://culina-share.vercel.app"} \n \nFor instance, I found this amazing ${
      recipe.strMeal
    } at https://culina-share.vercel.app/recipe/${slug}`;

    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  if (meal) {
    return (
      <React.Fragment>
        <Head>
          <title>{`${recipe.strMeal} - CulinaShare`}</title>
          <meta
            name="description"
            content="CulinaShare - Where Every Recipe Tells a Story!"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.svg" />
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
                    <li onClick={copyToClipboardHandler}>
                      <img src="/icons/copy.png" alt="clipboard icon" />
                    </li>
                  </Tooltip>
                  <Tooltip title="share on facebook" arrow placement="bottom">
                    <li onClick={shareToFacebookHandler}>
                      <img src="/icons/facebook.png" alt="facebook icon" />
                    </li>
                  </Tooltip>
                  <Tooltip title="share on whatsapp" arrow placement="bottom">
                    <li onClick={shareToWhatsAppHandler}>
                      <img src="/icons/whatsapp.png" alt="whatsapp icon" />
                    </li>
                  </Tooltip>
                  <Tooltip title="share via email" arrow placement="bottom">
                    <li onClick={shareToEmailHandler}>
                      <img src="/icons/email.png" alt="email icon" />
                    </li>
                  </Tooltip>
                  <Tooltip title="share on twitter" arrow placement="bottom">
                    <li onClick={shareToTwitterHandler}>
                      <img src="/icons/twitter.png" alt="twitter icon" />
                    </li>
                  </Tooltip>
                </ul>
              </div>
            </div>

            <div className={styles.reportRecipe}>
              <img src="/icons/report.svg" alt="report icon" />
              <p>find anything unusual? report this recipe!</p>
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
