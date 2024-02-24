"use client";

import { useRouter } from "next/router";
import styles from "./[slug].module.css";
import NavigationBar from "@/components/Navigation/NavigationBar";
import seperateLines from "@/utils/seperateLines";
import formatRecipeIngredients from "@/utils/formatRecipeIngredients";

export default function BlogPost({ meal }) {
  const router = useRouter();
  const { slug } = router.query;
  const recipe = meal.meals[0];

  if (!meal) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles.page_main}>
      <NavigationBar style={{ backgroundColor: "var(--primary-color)" }} />

      <div className={styles.page_container}>
        <div className={styles.page_left}>
          <h1 className={styles.mealName}>{recipe.strMeal}</h1>
          <h3 className={styles.mealArea}>{recipe.strArea}</h3>

          <div className={styles.mealIngredients}>
            <h2>Ingredients you'll need</h2>
            <ul>
              {formatRecipeIngredients(recipe).map((item) => {
                return (
                  <li>
                    {item.strIngredient}: {item.strMeasure}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.mealInstructions}>
            <h2>steps to prepare</h2>
            <ol>
              {seperateLines(recipe.strInstructions).map((step, index) => {
                return <li key={index}>{step}</li>;
              })}
            </ol>
          </div>
        </div>

        <div className={styles.page_right}>
          <img src={recipe.strMealThumb} alt="meal img" />
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${slug}`
  );
  const meal = await response.json();

  return {
    props: { meal },
  };
}

/*
Img: strMealThumb
area: strArea
Instructions: strInstructions
Ingredients: strIngredient1 … 20
measurements: strMeasure1 … 20
Yt: strYoutube
Source: strSource

*/

// const object1 = {
//   strIngredient1: "Olive Oil",
//   strIngredient2: "Onion",
//   strIngredient3: "Chicken Breast",
//   strIngredient4: "Ginger",
//   strIngredient5: "Harissa Spice",
//   strIngredient6: "Dried Apricots",
//   strIngredient7: "Chickpeas",
//   strIngredient8: "Couscous",
//   strIngredient9: "Chicken Stock",
//   strIngredient10: "Coriander",
//   strIngredient11: "",
//   strIngredient12: "",
//   strIngredient13: "",
//   strIngredient14: "",
//   strIngredient15: "",
//   strIngredient16: "",
//   strIngredient17: "abc",
//   strIngredient18: "",
//   strIngredient19: "xyz",
//   strIngredient20: "",
//   strMeasure1: "1 tbsp",
//   strMeasure2: "1 chopped",
//   strMeasure3: "200g",
//   strMeasure4: "pinch",
//   strMeasure5: "2 tblsp ",
//   strMeasure6: "10",
//   strMeasure7: "220g",
//   strMeasure8: "200g",
//   strMeasure9: "200ml",
//   strMeasure10: "Handful",
//   strMeasure11: "",
//   strMeasure12: "",
//   strMeasure13: "",
//   strMeasure14: "",
//   strMeasure15: "",
//   strMeasure16: "",
//   strMeasure17: "",
//   strMeasure18: "",
//   strMeasure19: "",
//   strMeasure20: "",

//   // more objects
// };

// const object2 = [
//   {
//     strIngredient1: "Olive Oil",
//     strMeasure1: "1 tbsp",
//   },
//   {
//     strIngredient2: "Onion",
//     strMeasure2: "1 chopped",
//   },
//   {
//     strIngredient3: "Chicken Breast",
//     strMeasure3: "200g",
//   },
//   {
//     strIngredient4: "Ginger",
//     strMeasure4: "pinch",
//   },
//   {
//     strIngredient5: "Harissa Spice",
//     strMeasure5: "2 tblsp ",
//   },
//   {
//     strIngredient6: "Dried Apricots",
//     strMeasure6: "10",
//   },
//   {
//     strIngredient7: "Chickpeas",
//     strMeasure7: "220g",
//   },
//   {
//     strIngredient8: "Couscous",
//     strMeasure8: "200g",
//   },
//   {
//     strIngredient9: "Chicken Stock",
//     strMeasure9: "200ml",
//   },
//   {
//     strIngredient10: "Coriander",
//     strMeasure10: "Handful",
//   },
//   {
//     strIngredient17: "abc",
//     strMeasure17: "-",
//   },
//   {
//     strIngredient19: "xyz",
//     strMeasure19: "-",
//   },

//   // more objects
// ];
