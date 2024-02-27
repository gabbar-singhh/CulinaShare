"use client";

import { useRouter } from "next/router";
import styles from "./[slug].module.css";
import NavigationBar from "@/components/Navigation/NavigationBar";
import seperateLines from "@/utils/seperateLines";
import formatRecipeIngredients from "@/utils/formatRecipeIngredients";
import extractDomain from "extract-domain";
import Link from "next/link";
import { useState } from "react";
import getYouTubeID from "get-youtube-id";
import { Tooltip } from "@radix-ui/themes";

export default function BlogPost({ meal }) {
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
    const defaultBody = `Hey, I found this amazing website where you get all the recipes for free. Checkout this - ${"https://culina-share.vercel.app"} \n \nFor instance, i found this   amazing ${
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

  if (meal) {
    return (
      <section className={styles.page_main}>
        <NavigationBar style={{ backgroundColor: "var(--primary-color)" }} />

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

          {recipe.strSource && (
            <div className={styles.mealSource}>
              <div>
                <h2>source</h2>

                <Link href={recipe.strSource} className={styles.sourceText}>
                  {extractDomain(recipe.strSource)}
                </Link>
              </div>
            </div>
          )}

          <div className={styles.mealSocialShare}>
            <div>
              <h2>Share: </h2>
              <ul className={styles.socialIcons}>
                <Tooltip side="top" content={clipCopyText}>
                  <li onClick={copyToClipboardHandler}>
                    <img src="/icons/copy.png" alt="clipboard icon" />
                  </li>
                </Tooltip>
                <Tooltip side="top" content="share on facebook">
                  <li onClick={shareToFacebookHandler}>
                    <img src="/icons/facebook.png" alt="facebook icon" />
                  </li>
                </Tooltip>
                <Tooltip side="top" content="share via email">
                  <li onClick={shareToEmailHandler}>
                    <img src="/icons/email.png" alt="email icon" />
                  </li>
                </Tooltip>
                <Tooltip side="top" content="share on twitter">
                  <li onClick={shareToTwitterHandler}>
                    <img src="/icons/twitter.png" alt="twitter icon" />
                  </li>
                </Tooltip>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${slug}`
  );
  let meal = await response.json();

  return {
    props: { meal },
  };
}
