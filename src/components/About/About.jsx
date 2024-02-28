import React from "react";
import styles from "./About.module.css";

const About = () => {
  const socialHandler = (event) => {
    const type = event.currentTarget.getAttribute("data-key");

    switch (type) {
      case "INSTA":
        window.open("https://www.instagram.com/codexhimanshu/", "_self");
        break;
      case "TWITTER":
        window.open("https://twitter.com/garadiya0", "_self");
        break;
      case "LINKEDIN":
        window.open("https://linkedin.com/in/himanshufs", "_self");
        break;
      case "FACEBOOK":
        window.open("https://facebook.com/", "_self");
        break;
      default:
      // no default case here
    }
  };
  return (
    <React.Fragment>
      <section className={styles.about_main}>
        <div className={styles.about_container}>
          <div className={styles.leftSide}>
            <h1>Culina Share</h1>
            <p>
              Your kitchen companion for delightful journeys in cooking.
              Explore, create, and savor recipes together, making culinary
              adventures accessible for every home chef.{" "}
            </p>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.companyBox}>
              <h3>company</h3>
              <ul>
                <li>Careers</li>
                <li>Legal</li>
                <li>Customer Stories</li>
                <li>Press Kit</li>
              </ul>
            </div>
            <div className={styles.resourceBox}>
              <h3>resources</h3>
              <ul>
                <li>blog</li>
                <li>eBooks</li>
                <li>Strategic Partners</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.about_bottomLane}>
          <h3>Connect with us</h3>

          <ul>
            <li
              className={styles.social}
              data-key={"INSTA"}
              onClick={socialHandler}
            >
              <img src="/icons/instagram-about.svg" />
            </li>
            <li
              className={styles.social}
              data-key={"TWITTER"}
              onClick={socialHandler}
            >
              <img src="/icons/twitterx-about.svg" />
            </li>
            <li
              className={styles.social}
              data-key={"LINKEDIN"}
              onClick={socialHandler}
            >
              <img src="/icons/linkedin-about.svg" />
            </li>
            <li
              className={styles.social}
              data-key={"FACEBOOK"}
              onClick={socialHandler}
            >
              <img src="/icons/facebook-about.svg" />
            </li>
          </ul>
        </div>
      </section>
      <footer className={styles.footer}>
        &copy; 2024 Culina Share, LTD. All rights reserved.
      </footer>
    </React.Fragment>
  );
};

export default About;
