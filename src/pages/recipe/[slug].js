"use client";

import { useRouter, useEffect } from "next/router";
import styles from "./[slug].module.css";

export default function BlogPost({ meal }) {
  const router = useRouter();
  const { slug } = router.query;

  if (!meal) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles.meals_main}>
      <h1>hello hello</h1>
      <div>
        <p>{JSON.stringify(meal.meals[0]) || "hel"}</p>
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
