import React, { useState, useEffect } from "react";
import styles from "./CategorySection.module.css";
import Link from "next/link";

const CategorySection = () => {
  return (
    <section className={styles.categoryMain}>
      <section className={styles.categoryContainer}>
        <div className={styles.categoryImage}>
          <img src="/assets/5.png" alt="" />
        </div>
        <div className={styles.featuresList}>
          <div className={styles.featureCard}>
            <div className={styles.kiteShape}>
              <img src="/icons/3000.png" alt="" />
            </div>
            <h3>3000+ Recipes</h3>
            <p>
              Explore a diverse collection of over 3000 recipes from around the
              world
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.kiteShape}>
              <img src="/icons/filter-white.png" alt="" />
            </div>
            <h3>Category Filter</h3>
            <p>
              Find recipes by filtering them based on categories such as vegan,
              seafood etc.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.kiteShape}>
              <img src="/icons/bookmark-white.png" alt="" />
            </div>
            <h3>Bookmark Favourites</h3>
            <p>Save your favorite recipes for quick access</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.kiteShape}>
              <img src="/icons/folder-white.svg" alt="" />
            </div>
            <h3>Add a New Recipe</h3>
            <p>
              Share your culinary creations by adding your own recipes to the
              platform.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.kiteShape}>
              <img src="/icons/video-white.png" alt="" />
            </div>
            <h3>Video Demo</h3>
            <p>
              Watch step-by-step video tutorials for a visual guide to cook your
              favorite recipe
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CategorySection;
