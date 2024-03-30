import React, { useEffect, useState } from "react";
import styles from "./GithubStatsSection.module.css";
import axios from "axios";
import { Fade } from "react-awesome-reveal";

const GithubStatsSection = () => {
  const [starCount, setStarCount] = useState(0);
  useEffect(() => {
    const fetchStars = async () => {
      try {
        const repoFullName = "gabbar-singhh/culinashare";
        const repoUrl = `https://api.github.com/repos/${repoFullName}`;
        const response = await axios.get(repoUrl);
        setStarCount(response.data.stargazers_count);
      } catch (error) {
        console.error("Error fetching CulinaShare GitHub repository:", error);
      }
    };

    fetchStars();
  }, []);

  return (
    <section className={styles.githubMain}>
      <div className={styles.githubContainer}>
      <Fade direction="up">
        <p className={styles.headTop}>3000+ recipes. categories. demo.</p>
      </Fade>
      <Fade direction="up">

        <h1 className={styles.heading}>
          CulinaShare deserves a ⭐️&nbsp; from you, don't you think so?
        </h1>
        </Fade>
      <Fade direction="up">

        <p className={styles.summary}>
          Join CulinaShare's vibrant culinary community! Explore 3000+ recipes,
          save favorites, and share your own. Help us grow on GitHub with a
          star, or support our mission through donations.
        </p>
        </Fade>
      <Fade direction="up">
        <div className={styles.githubButtons}>
          <div className={`${styles.githubRepoStars}`}>
            Stars {starCount} <img src="/icons/github.svg" alt="" />
          </div>
          <div className={styles.buyMeATee}>
            <a href="https://www.buymeacoffee.com/gabbar.singh">
              <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=gabbar.singh&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" />
            </a>
          </div>
        </div>
        </Fade>
      </div>
    </section>
  );
};

export default GithubStatsSection;
